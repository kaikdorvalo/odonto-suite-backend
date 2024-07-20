import { Controller, Get, Request } from '@nestjs/common';
import { ClinicUserService } from '../../domain/services/clinic-user.service';
@Controller('appointments')
export class ClinicUserController {
    constructor(private readonly clinicUserService: ClinicUserService) { }
}
