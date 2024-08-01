import { Controller, Post, UseFilters, UseGuards } from "@nestjs/common";
import { GenerateLicenseKeyUseCase } from "../../application/use-case/generate-license-key/generate-license-key.use-case";
import { HttpExceptionFilter } from "../../../../../common/exception-filters/http-exception.filter";
import { MasterGuard } from "../../../../../modules/common/auth/presentation/guards/master.guard";

@Controller('licenses')
@UseFilters(new HttpExceptionFilter())
export class LicenseController {
    constructor(
        private readonly generateLicenseKeyUseCase: GenerateLicenseKeyUseCase
    ) { }

    @Post('generate')
    @UseGuards(MasterGuard)
    async generateLicenseKey() {
        return await this.generateLicenseKeyUseCase.execute();
    }
}