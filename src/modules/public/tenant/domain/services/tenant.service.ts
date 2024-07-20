import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tenant } from '../entities/tenant.entity';
import { CreateTenantDto } from '../../../../../common/dtos/tenant/create-tenant.dto';
import { DataSources } from '../../../../../common/constants/data-sources.constants';
import { TenantSql } from 'src/modules/common/database/infrastructure/sql/tenant.sql';
import { Repositories } from 'src/common/constants/respositories.constants';
import { TenantRepository } from '../repositories/tenant.repository';
import { Regex } from 'src/common/utils/regex';
import { TenantRepositoryImpl } from '../../infrastructure/persistence/tenant.repository.impl';

@Injectable()
export class TenantService {
    constructor(
        @Inject(Repositories.TENANT_REPOSITORY)
        private readonly tenantRepository: TenantRepository,
    ) { }

    // async createTenant(name: string) {
    //     const tenant = new Tenant();
    //     const regex = new Regex();
    //     const cleanName = regex.onlyAlphabetic(name);

    //     if (name.length < 3) {
    //         //lancar a exception
    //     }

    //     const exists = await this.tenantRepository.findByName(cleanName);
    //     if (exists) {
    //         //lançar a exception de tenant já existe
    //     }


    //     tenant.name = cleanName;
    //     tenant.active = true;
    //     tenant.createdAt = new Date();
    //     tenant.updatedAt = tenant.createdAt;

    //     const queryRunner = this.dataSource.createQueryRunner();
    //     queryRunner.startTransaction();

    //     try {
    //         await this.tenantRepository.createTenant(tenant, queryRunner.manager);
    //         const schemaName = `tenant_${tenant.id}`;
    //         await this.tenantRepository.createSchema(schemaName, queryRunner.manager);

    //         const tenantSql = new TenantSql(schemaName);

    //         await tenantSql.run(queryRunner.manager);

    //         await queryRunner.commitTransaction();
    //         return tenant;
    //     } catch (error) {
    //         await queryRunner.rollbackTransaction();
    //         console.log(error)
    //         return null
    //     }
    // }


    validateName(name: string): string {
        const regex = new Regex();
        const cleanName = regex.onlyAlphabetic(name);

        if (name.length < 3) {
            throw new Error('Tenant name must be at least 3 characters long');
        }

        return cleanName;
    }

    async checkIfTenantExists(name: string): Promise<boolean> {
        const exists = await this.tenantRepository.findByName(name);
        return !!exists;
    }

}
