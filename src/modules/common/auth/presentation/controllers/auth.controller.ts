import { Body, Controller, Get, Post, UseFilters } from "@nestjs/common";
import { UserSignInUseCase } from "../../application/use-case/user-sign-in.use-case/user-sign-in.use-case";
import { UserSignInDto } from "src/common/dtos/user/user-sign-in.dto";
import { HttpExceptionFilter } from "src/common/exception-filters/http-exception.filter";

@Controller('auth')
@UseFilters(new HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly userSignInUseCase: UserSignInUseCase
    ) { }

    @Post('signin')
    async signIn(@Body() userSignIn: UserSignInDto) {
        return await this.userSignInUseCase.execute(userSignIn);
    }
}
