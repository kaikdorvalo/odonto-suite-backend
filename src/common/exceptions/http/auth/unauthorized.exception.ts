import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "src/common/enums/errors/errors.enum";

export class UnauthorizedException extends HttpException {
    constructor() {
        super(
            Errors.UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        )
    }
}