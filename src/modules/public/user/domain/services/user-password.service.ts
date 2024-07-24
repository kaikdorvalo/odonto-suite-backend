import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Repositories } from '../../../../../common/constants/respositories.constants';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';
import { UserPasswordRepository } from '../repositories/user-password.repository';

@Injectable()
export class UserPasswordService {
    constructor(
        @Inject(Repositories.USER_PASSWORD_REPOSITORY)
        private readonly userPasswordRepository: UserPasswordRepository
    ) { }

    async getUserPassword(user: User): Promise<UserPassword | null> {
        const userPassword = await this.userPasswordRepository.getUserPassword(user);
        return userPassword;
    }
}
