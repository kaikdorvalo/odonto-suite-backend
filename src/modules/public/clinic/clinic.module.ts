import { Module } from '@nestjs/common';
import { ClinicService } from './domain/services/clinic.service';
import { ClinicController } from './presentation/controllers/clinic.controller';

@Module({
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule { }
