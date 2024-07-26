import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/common/database/database.module';
import { ClinicUnitModule } from './modules/public/clinic-unit/clinic-unit.module';
import { ClinicModule } from './modules/public/clinic/clinic.module';
import { UserModule } from './modules/public/user/user.module';
import { TenancyModule } from './modules/common/tenancy/tenancy.module';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { AuthModule } from './modules/common/auth/auth.module';
import { AddressModule } from './modules/common/address/address.module';

@Module({
  imports: [
    TenancyModule,
    ClinicModule,
    ClinicUnitModule,
    DatabaseModule,
    UserModule,
    TenantModule,
    AuthModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
