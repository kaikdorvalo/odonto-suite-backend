import { User } from "../../domain/entities/user.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { DataSources } from "../../../../../common/constants/data-sources.constants";
import { UserPassword } from "../../domain/entities/user-password.entity";
import { UserPasswordRepository } from "../../domain/repositories/user-password.repository";

export class UserPasswordRepositoryImpl extends Repository<UserPassword> implements UserPasswordRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(UserPassword, dataSource.createEntityManager());
    }

    async getUserPassword(user: User): Promise<UserPassword> {
        return await this.findOneBy({ user: user });
    }

    createUserPassword(): UserPassword {
        return this.create();
    }

    async saveUserPassword(userPassword: UserPassword, manager: EntityManager): Promise<UserPassword> {
        return await manager.save(userPassword);
    }
}