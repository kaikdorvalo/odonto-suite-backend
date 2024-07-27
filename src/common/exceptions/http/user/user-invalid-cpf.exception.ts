import { HttpException, HttpStatus } from "@nestjs/common";
import { Errors } from "../../../../common/enums/errors/errors.enum";

export class UserInvalidCpfException extends HttpException {
    constructor() {
        super(
            Errors.USER_CPF_INVALID,
            HttpStatus.BAD_REQUEST
        )
    }
}