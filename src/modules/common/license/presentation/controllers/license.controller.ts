import { Controller, Post } from "@nestjs/common";
import { GenerateLicenseKeyUseCase } from "../../application/use-case/generate-license-key/generate-license-key.use-case";

@Controller('licenses')
export class LicenseController {
    constructor(
        private readonly generateLicenseKeyUseCase: GenerateLicenseKeyUseCase
    ) { }

    @Post('generate')
    async generateLicenseKey() {
        return await this.generateLicenseKeyUseCase.execute();
    }
}