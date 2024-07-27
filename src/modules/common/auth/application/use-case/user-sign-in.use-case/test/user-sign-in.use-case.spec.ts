import { DataSource } from "typeorm";
import { UserPasswordService } from "../../../../../../public/user/domain/services/user-password.service";
import { UserService } from "../../../../../../public/user/domain/services/user.service";
import { UserPasswordRepositoryImpl } from "../../../../../../public/user/infrastructure/persistence/user-password.repository.impl";
import { UserPasswordRepository } from "../../../../../../public/user/domain/repositories/user-password.repository";
import { UserRepository } from "../../../../../../public/user/domain/repositories/user.repository";
import { UserRepositoryImpl } from "../../../../../../public/user/infrastructure/persistence/user.repository.impl";
import { UserSignInUseCase } from "../user-sign-in.use-case";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { UserSignInDto } from "../../../../../../../common/dtos/user/user-sign-in.dto";
import { User } from "../../../../../../public/user/domain/entities/user.entity";
import { UserPassword } from "../../../../../../public/user/domain/entities/user-password.entity";
import { UnauthorizedException } from "../../../../../../../common/exceptions/http/auth/unauthorized.exception";

describe('User login use case', () => {
    let userSignInUseCase: UserSignInUseCase;
    let userService: UserService;
    let userRepository: UserRepository;
    let userPasswordService: UserPasswordService;
    let userPasswordRepository: UserPasswordRepository;
    let dataSource: DataSource;
    let jwtService: JwtService;

    let dataSourceMock = {
        createEntityManager: jest.fn()
    } as unknown as DataSource;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: true,
                    secret: 'testing secret',
                    signOptions: { expiresIn: '1d' },
                }),
            ],
        }).compile();


        dataSource = dataSourceMock;
        userRepository = new UserRepositoryImpl(dataSource);
        userService = new UserService(userRepository);
        userPasswordService = new UserPasswordService(userPasswordRepository)
        userPasswordRepository = new UserPasswordRepositoryImpl(dataSource);
        jwtService = module.get<JwtService>(JwtService);

        userSignInUseCase = new UserSignInUseCase(userService, userPasswordService, jwtService)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });


    describe('Sign in user', () => {
        it('Should sign in user', async () => {
            const userSignIn = new UserSignInDto();
            userSignIn.email = 'test@email.com';
            userSignIn.password = '12345678';

            const foundUser = new User();
            foundUser.id = 1;
            foundUser.firstName = 'Test';
            foundUser.lastName = 'Name';

            jest.spyOn(userService, 'getUserByEmail').mockReturnValue(Promise.resolve(foundUser));
            jest.spyOn(userPasswordService, 'getUserPassword').mockReturnValue(Promise.resolve(new UserPassword()))
            jest.spyOn(userService, 'comparePassword').mockReturnValue(Promise.resolve(true));

            const signIn = await userSignInUseCase.execute(userSignIn);

            const decode = await jwtService.decode(signIn.access_token);

            expect(signIn).toBeDefined();
            expect(signIn.access_token).toBeDefined();
            expect(decode.sub).toBe(1);
            expect(decode.firstName).toBe(foundUser.firstName);
            expect(decode.lastName).toBe(foundUser.lastName);
        })

        it('Should not sign in user if user not exists', async () => {
            const userSignIn = new UserSignInDto();
            userSignIn.email = 'test@email.com';
            userSignIn.password = '12345678';
            let error = null;

            jest.spyOn(userService, 'getUserByEmail').mockReturnValue(Promise.resolve(null));

            try {
                await userSignInUseCase.execute(userSignIn);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(UnauthorizedException);
        })

        it('Should not sign in user if user password not exists', async () => {
            const userSignIn = new UserSignInDto();
            userSignIn.email = 'test@email.com';
            userSignIn.password = '12345678';
            let error = null;

            jest.spyOn(userService, 'getUserByEmail').mockReturnValue(Promise.resolve(new User()));
            jest.spyOn(userPasswordService, 'getUserPassword').mockReturnValue(Promise.resolve(null));

            try {
                await userSignInUseCase.execute(userSignIn);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(UnauthorizedException);
        })

        it('Should not sign in user if was provided incorrect user password', async () => {
            const userSignIn = new UserSignInDto();
            userSignIn.email = 'test@email.com';
            userSignIn.password = '12345678';
            let error = null;

            jest.spyOn(userService, 'getUserByEmail').mockReturnValue(Promise.resolve(new User()));
            jest.spyOn(userPasswordService, 'getUserPassword').mockReturnValue(Promise.resolve(new UserPassword()));
            jest.spyOn(userService, 'comparePassword').mockReturnValue(Promise.resolve(false));

            try {
                await userSignInUseCase.execute(userSignIn);
            } catch (err) {
                error = err;
            }

            expect(error).toBeInstanceOf(UnauthorizedException);
        })
    })
})