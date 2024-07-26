import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { Repositories } from '../../../../../common/constants/respositories.constants';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';
import { UserPasswordRepository } from '../repositories/user-password.repository';
import { IHashedPassword } from '../../application/interfaces/hashed-password';
import { compare, genSalt, hash } from 'bcrypt';
import { Regex } from 'src/common/utils/regex';

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

    validateCpf(cpf: string) {
        if (typeof cpf !== "string") return false
        const regex = new Regex();
        cpf = regex.onlyNumbers(cpf);
        if (
            !cpf ||
            cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999"
        ) {
            return false
        }
        var soma = 0
        var resto
        for (var i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(9, 10))) return false
        soma = 0
        for (var i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
        resto = (soma * 10) % 11
        if ((resto == 10) || (resto == 11)) resto = 0
        if (resto != parseInt(cpf.substring(10, 11))) return false
        return true
    }

    async comparePassword(providedPassword: string, hashedPassword: string): Promise<boolean> {
        return await compare(providedPassword, hashedPassword);
    }
}
