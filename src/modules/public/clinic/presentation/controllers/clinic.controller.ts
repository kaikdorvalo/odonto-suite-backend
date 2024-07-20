import { Controller } from '@nestjs/common';
import { ClinicService } from '../../domain/services/clinic.service';

@Controller('clinic-units')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) { }
}
