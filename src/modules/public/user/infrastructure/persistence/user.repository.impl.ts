import { User } from "../../domain/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/user.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "src/common/constants/data-sources.constants";

export class UserRepositoryImpl extends Repository<User> implements UserRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
    async findById(id: number): Promise<User> {
        return await this.findOne({ where: { id: id } });
    }

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({ where: { email: email } });
    }

    async saveUser(user: User): Promise<User> {
        return await this.save(user);
    }

    sayHello(): string {
        return 'Hello'
    }

    // Outros métodos personalizados conforme necessário
}