import { Controller, Get, Request } from '@nestjs/common';
import { AppointmentService } from '../../domain/services/appointment.service';

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) { }
}
