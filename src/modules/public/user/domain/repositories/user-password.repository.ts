import { EntityManager } from "typeorm";
import { UserPassword } from "../entities/user-password.entity";
import { User } from "../entities/user.entity";

export interface UserPasswordRepository {
    getUserPassword(user: User): Promise<UserPassword>

    createUserPassword(): UserPassword

    saveUserPassword(userPassword: UserPassword, manager: EntityManager): Promise<UserPassword>
}