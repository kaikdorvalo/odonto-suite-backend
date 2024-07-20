import { Body, Controller, Get } from '@nestjs/common';
import { CreateTenantUseCase } from '../../application/use-case/create-tenant/create-tenant-use-case';
import { CreateTenantDto } from '../../../../../common/dtos/tenant/create-tenant.dto';

@Controller('tenants')
export class TenantController {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
    ) { }

    @Get()
    async createTenant(@Body() createTenant: CreateTenantDto) {
        return this.createTenantUseCase.execute(createTenant);
    }
}
