import { Module } from "@nestjs/common";
import { LicenseController } from "./presentation/controllers/license.controller";
import { LicenseService } from "./domain/services/license.service";

@Module({
    imports: [],
    providers: [
        LicenseService
    ],
    controllers: [
        LicenseController
    ],
})
export class LicenseModule { }