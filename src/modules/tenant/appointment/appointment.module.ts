import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../modules/common/database/database.module";
import { AppointmentController } from "./infrastructure/controllers/appointment.controller";
import { AppointmentService } from "./domain/services/appointment.service";

@Module({
    imports: [DatabaseModule],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class TenantModule { }
