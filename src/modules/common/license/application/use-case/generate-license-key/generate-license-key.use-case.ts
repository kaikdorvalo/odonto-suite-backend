import { Injectable } from "@nestjs/common";
import { LicenseService } from "../../../domain/services/license.service";
import { httpExceptionHandler } from "../../../../../../common/utils/exception-handler";


@Injectable()
export class GenerateLicenseKeyUseCase {
    constructor(
        private readonly licenseService: LicenseService
    ) { }

    async execute(): Promise<string> {
        try {
            let exists = true;
            let generatedKey = '';
            do {
                generatedKey = this.licenseService.generateLicenseKey();
                exists = await this.licenseService.verifyThatTheKeyExists(generatedKey);
            } while (exists);
            return generatedKey;
        } catch (err) {
            httpExceptionHandler(err)
        }
    }
}