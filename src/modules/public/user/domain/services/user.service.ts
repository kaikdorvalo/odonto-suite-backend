import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Repositories } from '../../../../../common/constants/respositories.constants';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';
import { UserPasswordRepository } from '../repositories/user-password.repository';
import { IHashedPassword } from '../../application/interfaces/hashed-password';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @Inject(Repositories.USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async getUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }

    async hashPassword(password: string): Promise<IHashedPassword> {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(password, salt);
        return {
            salt: salt,
            hashedPassword: hashedPassword
        }
    }

    async comparePassword(providedPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(providedPassword, hashedPassword);
    }
}
