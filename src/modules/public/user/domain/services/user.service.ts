import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Repositories } from 'src/common/constants/respositories.constants';

@Injectable()
export class UserService {
    constructor(
        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    sayHello() {
        return this.userRepository.sayHello();
    }
}
