import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Repositories } from '../../../../../common/constants/respositories.constants';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';
import { UserPasswordRepository } from '../repositories/user-password.repository';

@Injectable()
export class UserService {
    constructor(
        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    sayHello() {
        return this.userRepository.sayHello();
    }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
}
