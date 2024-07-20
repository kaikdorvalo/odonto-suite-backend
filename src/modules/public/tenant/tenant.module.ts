import { Module } from '@nestjs/common';
import { TenantController } from './presentation/controllers/tenant.controller';
import { TenantService } from './domain/services/tenant.service';
import { DatabaseModule } from '../../../modules/common/database/database.module';
import { Repositories } from 'src/common/constants/respositories.constants';
import { TenantRepositoryImpl } from './infrastructure/persistence/tenant.repository.impl';
import { CreateTenantUseCase } from './application/use-case/create-tenant/create-tenant-use-case';

@Module({
    imports: [DatabaseModule],
    controllers: [TenantController],
    providers: [
        TenantService,
        CreateTenantUseCase,
        {
            provide: Repositories.TENANT_REPOSITORY,
            useClass: TenantRepositoryImpl
        }
    ],
})
export class TenantModule { }
