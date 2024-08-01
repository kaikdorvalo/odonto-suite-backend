import { DataSource } from "typeorm"
import { UserRepositoryImpl } from "../../../infrastructure/persistence/user.repository.impl"
import { UserRepository } from "../../repositories/user.repository"
import { UserService } from "../user.service"
import { User } from "../../entities/user.entity"
import { UserType } from "../../entities/user-type.entity"
import { UserTypes } from "../../../../../../common/constants/user-types.constants"

describe('User Service Test', () => {
    let userService: UserService;
    let userRepository: UserRepository;
    let dataSource: DataSource;

    let dataSourceMock = {
        createEntityManager: jest.fn()
    } as unknown as DataSource;

    beforeEach(() => {
        dataSource = dataSourceMock
        dataSource.createEntityManager = jest.fn();
        userRepository = new UserRepositoryImpl(dataSource);
        userService = new UserService(userRepository);
    })

    describe('getUserById', () => {
        it('Should get user by id if user id exists', async () => {
            const user = new User();
            user.id = 1;
            jest.spyOn(userService, 'getUserById');
            jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user));
            const foundUser = await userService.getUserById(1);

            expect(foundUser).toBeDefined();
            expect(foundUser.id).toBe(1);
            expect(userService.getUserById).toHaveBeenCalledWith(1);
        });

        it('Should return null if user id not exists', async () => {
            const user = null;
            jest.spyOn(userService, 'getUserById');
            jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user));
            const foundUser = await userService.getUserById(1);

            expect(foundUser).toBe(null);
            expect(userService.getUserById).toHaveBeenCalledWith(1);
        })

        it('Should return null if string is provided', async () => {
            const user = null;
            jest.spyOn(userService, 'getUserById');
            jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user));
            const id: any = 'a'
            const foundUser = await userService.getUserById(id);

            expect(foundUser).toBe(null);
            expect(userService.getUserById).toHaveBeenCalledWith(id);
        })
    });

    describe('getUserByEmail', () => {
        it('Should get user by email if user email exists', async () => {
            const user = new User();
            user.email = 'teste@gmail.com';
            jest.spyOn(userService, 'getUserByEmail');
            jest.spyOn(userRepository, 'findByEmail').mockReturnValue(Promise.resolve(user));
            const foundUser = await userService.getUserByEmail('teste@gmail.com')

            expect(foundUser).toBeDefined();
            expect(foundUser.email).toBe('teste@gmail.com');
            expect(userService.getUserByEmail).toHaveBeenCalledWith('teste@gmail.com');
        });

        it('Should return null if user email not exists', async () => {
            const user = null;
            jest.spyOn(userService, 'getUserByEmail');
            jest.spyOn(userRepository, 'findByEmail').mockReturnValue(Promise.resolve(user));
            const foundUser = await userService.getUserByEmail('teste@gmail.com');

            expect(foundUser).toBe(null);
            expect(userService.getUserByEmail).toHaveBeenCalledWith('teste@gmail.com');
        })

        it('Should return null if number is provided', async () => {
            const user = null;
            jest.spyOn(userService, 'getUserByEmail');
            jest.spyOn(userRepository, 'findByEmail').mockReturnValue(Promise.resolve(user));
            const email: any = 23
            const foundUser = await userService.getUserByEmail(email);

            expect(foundUser).toBe(null);
            expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
        })
    })

    describe('hashPassword', () => {
        it('Should hash password', async () => {
            const password = '12345678';
            const hashed = await userService.hashPassword(password);
            const compare = await userService.comparePassword(password, hashed.hashedPassword);

            expect(compare).toBe(true);
            expect(hashed.hashedPassword).toBeDefined();
            expect(hashed.salt).toBeDefined();
        })
    })

    describe('clearCpf', () => {
        it('Should be clear cpf string to only numbers string', () => {
            const cpf = '123. fsef 4 gldg. 56,~dpr/n5271..;';
            const expectResult = '1234565271';
            const clean = userService.clearCpf(cpf);

            expect(clean).toEqual(expectResult);
        })

        it('Should return null if provided a number', () => {
            const cpf: any = 124;
            const clean = userService.clearCpf(cpf);

            expect(clean).toBe(null);
        })
    })

    describe('validateCpf', () => {
        it('Should return true when a valid cpf is provided', () => {
            const validCpfList = [
                '285.475.380-11',
                '376.392.530-98',
                '37827503063',
                '84246035084',
                '77819293063',
                '26625220035',
                '732.438.200-22',
                '297.377.830-18',
                '822.865.910-59'
            ]

            for (let cpf of validCpfList) {
                const isValid = userService.validateCpf(cpf);
                expect(isValid).toBe(true);
            }
        })

        it('Should return false when invalid cpf is provided', () => {
            const invalidCpfList = [
                '13765465435',
                '25478963214',
                '145.652.963-55',
                '00000000000',
                '11111111111',
                '22222222222',
                '33333333333',
                '44444444444',
                '55555555555',
                '66666666666',
                '77777777777',
                '88888888888',
                '99999999999',
                '21457896321',
                '214524785632286',
                '124578'
            ]

            for (let cpf of invalidCpfList) {
                const isValid = userService.validateCpf(cpf);
                expect(isValid).toBe(false);
            }
        })

        it('Should return false when a number is provided', () => {
            const cpf: any = 37639253098;
            const isValid = userService.validateCpf(cpf);

            expect(isValid).toBe(false);
        })
    })

    describe('comparePassword', () => {
        it('Should return true if password is valid for the hashed password', async () => {
            const password = '12345678';
            const hashed = await userService.hashPassword(password);
            const compare = await userService.comparePassword(password, hashed.hashedPassword);

            expect(compare).toBe(true);
        })

        it('Should return false if password isnt valid for the hashed password', async () => {
            const password = '12345678';
            const otherPassword = '2456464';
            const hashed = await userService.hashPassword(password);
            const compare = await userService.comparePassword(otherPassword, hashed.hashedPassword);

            expect(compare).toBe(false)
        })
    })

    describe('isMasterUser', () => {
        it('Should return true when valid master user', async () => {
            const user = new User();
            const userType = new UserType();
            userType.name = UserTypes.MASTER;
            user.userType = userType;

            jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user))
            const result = await userService.isMasterUser(1);

            expect(result).toBe(true);
        })

        it('Should return false when invalid master user', async () => {
            const user = new User();
            const userType = new UserType();
            userType.name = UserTypes.CUSTOMER;
            user.userType = userType;

            jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user))
            const result = await userService.isMasterUser(1);

            expect(result).toBe(false);
        })
    })
})