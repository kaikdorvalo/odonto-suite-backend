import { IUserPassword } from "./user-password.interface";
import { IUser } from "./user.interface";

export interface IUserWithPassword extends IUser, IUserPassword {

}