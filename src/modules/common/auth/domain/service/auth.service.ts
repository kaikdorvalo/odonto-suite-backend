import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../../../../modules/public/user/domain/services/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }

    async signIn(username: string, pass: string): Promise<any> {

    }
}