import { Inject, Injectable } from "@nestjs/common";
import { UserSignInDto } from "../../../../../../common/dtos/user/user-sign-in.dto";
import { UserService } from "../../../../../../modules/public/user/domain/services/user.service";
import { UserPasswordService } from "src/modules/public/user/domain/services/user-password.service";
import { JwtService } from "@nestjs/jwt";
import { httpExceptionHandler } from "src/common/utils/exception-handler";
import { UnauthorizedException } from "src/common/exceptions/http/auth/unauthorized.exception";

@Injectable()
export class UserSignInUseCase {
    constructor(
        private readonly userService: UserService,
        private readonly userPasswordService: UserPasswordService,

        private jwtService: JwtService
    ) { }

    async execute(userSignIn: UserSignInDto): Promise<{ access_token: string }> {
        try {
            const user = await this.userService.getUserByEmail(userSignIn.email);
            if (!user) {
                throw new UnauthorizedException();
            }

            const userPassword = await this.userPasswordService.getUserPassword(user);
            if (!userPassword) {
                throw new UnauthorizedException();
            }

            if (!(await this.userService.comparePassword(userSignIn.password, userPassword.passwordHash))) {
                throw new UnauthorizedException();
            }

            console.log()

            const payload = { sub: user.id, firstName: user.firstName, lastName: user.lastName };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (error) {
            httpExceptionHandler(error);
        }
    }
}