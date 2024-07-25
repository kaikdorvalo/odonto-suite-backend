import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../../common/enums/errors/errors.enum";

export class TenantAlreadyExistsException extends HttpException {
    constructor() {
        super(
            Errors.TENANT_ALREADY_EXISTS,
            HttpStatus.CONFLICT
        )
    }
}