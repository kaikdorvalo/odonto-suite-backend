import { Module } from "@nestjs/common";
import { LicenseController } from "./presentation/controllers/license.controller";
import { LicenseService } from "./domain/services/license.service";
import { Repositories } from "../../../common/constants/respositories.constants";
import { LicenseRepositoryImpl } from "./infrastructure/persistence/license.repository.impl";
import { GenerateLicenseKeyUseCase } from "./application/use-case/generate-license-key/generate-license-key.use-case";
import { DatabaseModule } from "../database/database.module";
import { UserModule } from "src/modules/public/user/user.module";

@Module({
    imports: [
        DatabaseModule,
        UserModule
    ],
    providers: [
        LicenseService,
        GenerateLicenseKeyUseCase,
        {
            provide: Repositories.LICENSE_REPOSITORY,
            useClass: LicenseRepositoryImpl
        }
    ],
    controllers: [
        LicenseController
    ],
})
export class LicenseModule { }