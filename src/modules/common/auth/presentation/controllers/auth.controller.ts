import { Body, Controller, Get, HttpStatus, Post, UseFilters } from "@nestjs/common";
import { UserSignInUseCase } from "../../application/use-case/user-sign-in.use-case/user-sign-in.use-case";
import { UserSignInDto } from "src/common/dtos/user/user-sign-in.dto";
import { HttpExceptionFilter } from "src/common/exception-filters/http-exception.filter";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Errors } from "src/common/enums/errors/errors.enum";

@Controller('auth')
@UseFilters(new HttpExceptionFilter)
export class AuthController {
    constructor(
        private readonly userSignInUseCase: UserSignInUseCase
    ) { }

    @Post('signin')
    @ApiOperation({ summary: 'User Authentication' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: Errors.UNAUTHORIZED })
    async signIn(@Body() userSignIn: UserSignInDto) {
        return await this.userSignInUseCase.execute(userSignIn);
    }
}
