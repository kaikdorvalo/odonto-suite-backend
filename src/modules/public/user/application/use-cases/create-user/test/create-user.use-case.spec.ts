import { UserService } from "../../../../domain/services/user.service";
import { CreateUserUseCase } from "../create-user.use-case"
import { UserRepository } from "../../../../domain/repositories/user.repository";
import { DataSource, EntityManager, QueryRunner } from "typeorm";
import { UserRepositoryImpl } from "../../../../infrastructure/persistence/user.repository.impl";
import { UserPasswordRepository } from "../../../../../user/domain/repositories/user-password.repository";
import { CreateUserDto } from "../../../../../../../common/dtos/user/create-user.dto";
import { User } from "../../../../../user/domain/entities/user.entity";
import { UserPassword } from "../../../../../user/domain/entities/user-password.entity";
import { UserPasswordRepositoryImpl } from "../../../../../user/infrastructure/persistence/user-password.repository.impl";
import { UserInvalidCpfException } from "../../../../../../../common/exceptions/http/user/user-invalid-cpf.exception";
import { UserAlreadyExistsException } from "../../../../../../../common/exceptions/http/user/user-already-exists.exception";

describe('Create user use case test', () => {
    let createUserUseCase: CreateUserUseCase;
    let userService: UserService;
    let userRepository: UserRepository;
    let userPasswordRepository: UserPasswordRepository
    let dataSource: DataSource;

    let managerMock = {
        save: jest.fn()
    } as unknown as EntityManager;

    let queryRunnerMock = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: managerMock
    } as unknown as QueryRunner;

    let dataSourceMock = {
        createEntityManager: jest.fn(),
        createQueryRunner: jest.fn(() => queryRunnerMock)
    } as unknown as DataSource;

    beforeEach(() => {
        dataSource = dataSourceMock
        dataSource.createEntityManager = jest.fn();
        userRepository = new UserRepositoryImpl(dataSource);
        userService = new UserService(userRepository);
        userPasswordRepository = new UserPasswordRepositoryImpl(dataSource);

        createUserUseCase = new CreateUserUseCase(userService, userRepository, userPasswordRepository, dataSource);
    })

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('Create user with correct values', () => {
        it('Should Create a new user', async () => {
            jest.spyOn(queryRunnerMock, 'release');
            jest.spyOn(userRepository, 'createUser');
            jest.spyOn(userPasswordRepository, 'createUserPassword');
            jest.spyOn(userService, 'hashPassword');
            jest.spyOn(userPasswordRepository, 'saveUserPassword')

            const createUser = new CreateUserDto();
            createUser.cpf = '376.392.530-98';
            createUser.dateOfBirth = new Date('2004-03-25');
            createUser.email = 'test@email.com';
            createUser.firstName = 'Test';
            createUser.lastName = 'Name';
            createUser.password = '12345678';

            jest.spyOn(userRepository, 'findUserBy').mockReturnValue(Promise.resolve(null));
            jest.spyOn(userRepository, 'createUser').mockReturnValue(new User());
            jest.spyOn(userPasswordRepository, 'createUserPassword').mockReturnValue(new UserPassword());
            jest.spyOn(userRepository, 'saveUser').mockReturnValue(Promise.resolve(new User()));

            const user = await createUserUseCase.execute(createUser);

            expect(user.active).toBe(true);
            expect(user.createdAt).toBeDefined();
            expect(user.updatedAt).toBeDefined();
            expect(queryRunnerMock.connect).toHaveBeenCalled();
            expect(queryRunnerMock.startTransaction).toHaveBeenCalled();
            expect(userRepository.findUserBy).toHaveBeenCalledWith({ where: [{ email: createUser.email, active: true }, { cpf: createUser.cpf, active: true }] })
            expect(userRepository.createUser).toHaveBeenCalledWith(createUser)
            expect(userPasswordRepository.createUserPassword).toHaveBeenCalled();
            expect(userService.hashPassword).toHaveBeenCalledWith(createUser.password);
            expect(userPasswordRepository.saveUserPassword).toHaveBeenCalled();
            expect(queryRunnerMock.commitTransaction).toHaveBeenCalled();
            expect(queryRunnerMock.release).toHaveBeenCalled();
        })

        it('Should not create user if was provided invalid cpf', async () => {
            const createUser = new CreateUserDto();
            createUser.cpf = '12345678654';
            createUser.dateOfBirth = new Date('2004-03-25');
            createUser.email = 'test@email.com';
            createUser.firstName = 'Test';
            createUser.lastName = 'Name';
            createUser.password = '12345678';
            let error = null;

            try {
                await createUserUseCase.execute(createUser);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(UserInvalidCpfException);
        })

        it('Should not create user if user email or cpf already exists', async () => {
            const createUser = new CreateUserDto();
            createUser.cpf = '376.392.530-98';
            createUser.dateOfBirth = new Date('2004-03-25');
            createUser.email = 'test@email.com';
            createUser.firstName = 'Test';
            createUser.lastName = 'Name';
            createUser.password = '12345678';
            let error = null;

            jest.spyOn(userRepository, 'findUserBy').mockReturnValue(Promise.resolve(new User()))

            try {
                await createUserUseCase.execute(createUser);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(UserAlreadyExistsException);
        })

        it('Should not save user if errors occurs', async () => {
            const createUser = new CreateUserDto();
            createUser.cpf = '376.392.530-98';
            createUser.dateOfBirth = new Date('2004-03-25');
            createUser.email = 'test@email.com';
            createUser.firstName = 'Test';
            createUser.lastName = 'Name';
            createUser.password = '12345678';


            jest.spyOn(userRepository, 'findUserBy').mockReturnValue(Promise.resolve(null))
            jest.spyOn(userRepository, 'saveUser').mockImplementation(() => {
                throw new Error()
            });
            jest.spyOn(userRepository, 'createUser').mockReturnValue(new User());

            try {
                await createUserUseCase.execute(createUser);
            } catch (err) { }

            expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
            expect(queryRunnerMock.commitTransaction).toHaveBeenCalledTimes(0);
        })

        it('Should not save user if errors occurs in save password', async () => {
            const createUser = new CreateUserDto();
            createUser.cpf = '376.392.530-98';
            createUser.dateOfBirth = new Date('2004-03-25');
            createUser.email = 'test@email.com';
            createUser.firstName = 'Test';
            createUser.lastName = 'Name';
            createUser.password = '12345678';


            jest.spyOn(userRepository, 'findUserBy').mockReturnValue(Promise.resolve(null))
            jest.spyOn(userPasswordRepository, 'saveUserPassword').mockImplementation(() => {
                throw new Error()
            });
            jest.spyOn(userRepository, 'createUser').mockReturnValue(new User());
            jest.spyOn(userPasswordRepository, 'createUserPassword').mockReturnValue(new UserPassword())

            try {
                await createUserUseCase.execute(createUser);
            } catch (err) { }

            expect(queryRunnerMock.rollbackTransaction).toHaveBeenCalled();
            expect(queryRunnerMock.commitTransaction).toHaveBeenCalledTimes(0);
        })
    })
})