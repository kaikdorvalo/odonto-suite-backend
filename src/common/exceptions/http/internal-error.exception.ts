import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../common/enums/errors/errors.enum";

export class InternalErrorException extends HttpException {
    constructor() {
        super(
            Errors.INTERNAL_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}