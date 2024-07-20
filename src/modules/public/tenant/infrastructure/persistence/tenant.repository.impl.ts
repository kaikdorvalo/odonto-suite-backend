import { DataSource, EntityManager, Repository } from "typeorm";
import { Inject } from "@nestjs/common";
import { DataSources } from "../../../../../common/constants/data-sources.constants";
import { Tenant } from "../../domain/entities/tenant.entity";
import { TenantRepository } from "../../domain/repositories/tenant.repository";

export class TenantRepositoryImpl extends Repository<Tenant> implements TenantRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(Tenant, dataSource.createEntityManager());
    }

    createTenant(tenant: Tenant, manager: EntityManager): Promise<Tenant> {
        return manager.save(tenant);
    }

    createSchema(schemaName: string, manager: EntityManager): Promise<void> {
        return manager.query(`CREATE SCHEMA ${schemaName}`);
    }

    async findById(id: number): Promise<Tenant | null> {
        return await this.findOneBy({ id: id })
    }

    async findByName(name: string): Promise<Tenant | null> {
        return await this.findOneBy({ name: name });
    }
    // Outros métodos personalizados conforme necessário
}