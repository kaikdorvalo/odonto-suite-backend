import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../../common/enums/errors/errors.enum";

export class UserAlreadyExistsException extends HttpException {
    constructor() {
        super(
            Errors.USER_ALREADY_EXISTS,
            HttpStatus.CONFLICT
        )
    }
}