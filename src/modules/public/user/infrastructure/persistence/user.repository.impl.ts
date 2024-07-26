import { User } from "../../domain/entities/user.entity";
import { DataSource, EntityManager, FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "../../../../../common/constants/data-sources.constants";

export class UserRepositoryImpl extends Repository<User> implements UserRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async findById(id: number): Promise<User> {
        return await this.findOne({ where: { id: id, active: true } });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({ where: { email: email, active: true } });
    }

    async findUserBy(options: FindOneOptions<User>): Promise<User | null> {
        return this.findOne(options);
    }

    async saveUser(user: User, manager: EntityManager): Promise<User> {
        return await manager.save(user);
    }

    createUser(user: Partial<User>): User {
        return this.create(user);
    }

    // Outros métodos personalizados conforme necessário
}