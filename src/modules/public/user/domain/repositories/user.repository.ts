import { IUserWithPassword } from "../../application/interfaces/user-with-password.interface";
import { UserPassword } from "../entities/user-password.entity";
import { User } from "../entities/user.entity";

export interface UserRepository {
    findById(id: number): Promise<User>;

    findByEmail(email: string): Promise<User>;

    saveUser(user: User): Promise<User>;

    sayHello(): string;
}