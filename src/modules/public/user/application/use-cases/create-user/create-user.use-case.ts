import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/common/dtos/user/create-user.dto";
import { User } from "../../../domain/entities/user.entity";
import { UserService } from "../../../domain/services/user.service";
import { httpExceptionHandler } from "src/common/utils/exception-handler";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UserPasswordRepository } from "../../../domain/repositories/user-password.repository";
import { Repositories } from "src/common/constants/respositories.constants";
import { UserAlreadyExistsException } from "src/common/exceptions/http/user/user-already-exists.exception";
import { DataSources } from "src/common/constants/data-sources.constants";
import { DataSource } from "typeorm";

@Injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userService: UserService,

        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository,

        @Inject(Repositories.USER_PASSWORD_REPOSITORY)
        private readonly userPasswordRepository: UserPasswordRepository,

        @Inject(DataSources.DEFAULT_DATASOURCE)
        private dataSource: DataSource
    ) { }

    async execute(createUser: CreateUserDto): Promise<User | null> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const exists = await this.userRepository.findUserBy({ where: [{ email: createUser.email }, { cpf: createUser.cpf }] });
            if (exists) {
                throw new UserAlreadyExistsException();
            }

            const newUser = this.userRepository.createUser(createUser);
            newUser.active = true;
            newUser.createdAt = new Date();
            newUser.updatedAt = newUser.createdAt;
            await this.userRepository.saveUser(newUser, queryRunner.manager);

            const newUserPassword = this.userPasswordRepository.createUserPassword();
            const hashed = await this.userService.hashPassword(createUser.password);
            newUserPassword.user = newUser;
            newUserPassword.passwordHash = hashed.hashedPassword;
            newUserPassword.passwordSalt = hashed.salt;
            await this.userPasswordRepository.saveUserPassword(newUserPassword, queryRunner.manager);

            await queryRunner.commitTransaction();

            return newUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            httpExceptionHandler(error);
        } finally {
            await queryRunner.release();
        }
    }
}