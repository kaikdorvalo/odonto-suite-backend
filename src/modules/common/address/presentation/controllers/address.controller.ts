import { Controller, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/common/exception-filters/http-exception.filter";

@Controller('address')
@ApiTags('address')
@UseFilters(new HttpExceptionFilter())
export class AddressController {
    constructor() {

    }

}