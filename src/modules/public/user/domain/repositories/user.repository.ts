import { EntityManager, FindOneOptions } from "typeorm";
import { User } from "../entities/user.entity";

export interface UserRepository {
    findById(id: number): Promise<User>;

    findByEmail(email: string): Promise<User>;

    findUserBy(options: FindOneOptions<User>): Promise<User | null>

    saveUser(user: User, manager: EntityManager): Promise<User>;

    createUser(user: Partial<User>): User;
}