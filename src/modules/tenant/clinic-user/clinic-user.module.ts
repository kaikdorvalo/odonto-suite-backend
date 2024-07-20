import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../modules/common/database/database.module";
import { ClinicUserController } from "./presentation/controllers/clinic-user.controller";
import { ClinicUserService } from "./domain/services/clinic-user.service";

@Module({
    imports: [DatabaseModule],
    controllers: [ClinicUserController],
    providers: [ClinicUserService],
})
export class TenantModule { }
