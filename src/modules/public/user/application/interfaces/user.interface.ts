import { Address } from "../../../../../common/entities/address.entity";
import { UserClinicUnit } from "../../domain/entities/user-clinic-unit.entity";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    address: Address;
    userClinicUnits: UserClinicUnit[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}