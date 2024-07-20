import { Module } from '@nestjs/common';
import { ClinicUnitController } from './presentation/controllers/clinic-unit.controller';
import { ClinicUnitService } from './domain/services/clinic-unit.service';

@Module({
  controllers: [ClinicUnitController],
  providers: [ClinicUnitService],
})
export class ClinicUnitModule { }
