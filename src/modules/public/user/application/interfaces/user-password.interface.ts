import { User } from "../../domain/entities/user.entity";

export interface IUserPassword {
    id: number;
    passwordHash: string;
    passwordSalt: string;
    user: User;
}