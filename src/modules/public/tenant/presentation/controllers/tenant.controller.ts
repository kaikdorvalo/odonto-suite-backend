import { Body, Controller, Get, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { CreateTenantUseCase } from '../../application/use-case/create-tenant/create-tenant-use-case';
import { CreateTenantDto } from '../../../../../common/dtos/tenant/create-tenant.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../../../../common/exception-filters/http-exception.filter';
import { Errors } from '../../../../../common/enums/errors/errors.enum';

@ApiTags('tenant')
@Controller('tenants')
@UseFilters(new HttpExceptionFilter())
export class TenantController {
    constructor(
        private readonly createTenantUseCase: CreateTenantUseCase,
    ) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new Tenant' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Tenant created.' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: Errors.TENANT_ALREADY_EXISTS })
    async createTenant(@Body() createTenant: CreateTenantDto) {
        return this.createTenantUseCase.execute(createTenant);
    }
}
