import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../../domain/services/tenant.service";
import { TenantRepository } from "../../../domain/repositories/tenant.repository";
import { Repositories } from "../../../../../../common/constants/respositories.constants";
import { DataSource } from "typeorm";
import { DataSources } from "../../../../../../common/constants/data-sources.constants";
import { Tenant } from "../../../domain/entities/tenant.entity";
import { TenantSql } from "../../../../../../modules/common/database/infrastructure/sql/tenant.sql";
import { CreateTenantDto } from "../../../../../../common/dtos/tenant/create-tenant.dto";
import { httpExceptionHandler } from "src/common/utils/exception-handler";
import { TenantAlreadyExistsException } from "src/common/exceptions/http/tenant/tenant-already-exists.exception";


@Injectable()
export class CreateTenantUseCase {
    constructor(
        private tenantService: TenantService,

        @Inject(Repositories.TENANT_REPOSITORY)
        private tenantRepository: TenantRepository,

        @Inject(DataSources.DEFAULT_DATASOURCE)
        private dataSource: DataSource
    ) { }

    async execute(createTenant: CreateTenantDto): Promise<Tenant | null> {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const cleanName = this.tenantService.validateName(createTenant.name);
            if (await this.tenantService.checkIfTenantExists(cleanName)) {
                throw new TenantAlreadyExistsException();
            }

            const tenant = new Tenant();
            tenant.name = cleanName;
            tenant.active = true;
            tenant.createdAt = new Date();
            tenant.updatedAt = tenant.createdAt;

            await this.tenantRepository.createTenant(tenant, queryRunner.manager);
            const schemaName = 'tenant_' + tenant.id;
            await this.tenantRepository.createSchema(schemaName, queryRunner.manager);

            const tenantSql = new TenantSql(schemaName);
            await tenantSql.run(queryRunner.manager);

            await queryRunner.commitTransaction();
            return tenant;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            httpExceptionHandler(error);
        } finally {
            await queryRunner.release();
        }
    }
}