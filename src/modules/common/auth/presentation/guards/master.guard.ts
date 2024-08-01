import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '../../../../../common/exceptions/http/auth/unauthorized.exception';
import { httpExceptionHandler } from '../../../../../common/utils/exception-handler';
import { UserService } from '../../../../../modules/public/user/domain/services/user.service';

@Injectable()
export class MasterGuard implements CanActivate {
    constructor(
        private readonly userService: UserService
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const user = request["user"];
            if (!user) {
                throw new UnauthorizedException();
            }

            const isMaster = await this.userService.isMasterUser(Number(user.sub));
            if (!isMaster) {
                throw new UnauthorizedException();
            }

            return true;
        } catch (err) {
            httpExceptionHandler(err);
            return false;
        }
    }
}