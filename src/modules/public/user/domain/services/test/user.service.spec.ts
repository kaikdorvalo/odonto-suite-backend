import { DataSource } from "typeorm"
import { UserRepositoryImpl } from "../../../infrastructure/persistence/user.repository.impl"
import { UserRepository } from "../../repositories/user.repository"
import { UserService } from "../user.service"
import { User } from "../../entities/user.entity"

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

    it('Should get user by id if user id exists', async () => {
        const user = new User();
        user.id = 1;
        jest.spyOn(userService, 'getUserById');
        jest.spyOn(userRepository, 'findById').mockReturnValue(Promise.resolve(user));
        const foundUser = await userService.getUserById(1);

        expect(foundUser).toBeDefined();
        expect(foundUser.id).toBe(1);
        expect(userService.getUserById).toHaveBeenCalledWith(1);
    })
})