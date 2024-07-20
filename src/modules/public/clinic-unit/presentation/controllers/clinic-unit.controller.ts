import { Controller } from '@nestjs/common';
import { ClinicUnitService } from '../../domain/services/clinic-unit.service';

@Controller('clinics')
export class ClinicUnitController {
  constructor(private readonly clinicUnitService: ClinicUnitService) { }
}
