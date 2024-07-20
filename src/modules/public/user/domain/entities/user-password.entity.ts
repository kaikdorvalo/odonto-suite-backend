import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { USER_PASSWORD_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { SCHEMAS } from "../../../../../common/constants/schemas.constants";

@Entity({ name: DefaultTableNames.USER_PASSWORD, schema: SCHEMAS.PUBLIC })
export class UserPassword {
    @PrimaryGeneratedColumn({ name: USER_PASSWORD_TABLE.ID })
    id: number;

    @Column({ name: USER_PASSWORD_TABLE.PASSWORD_HASH, nullable: false })
    passwordHash: string;

    @Column({ name: USER_PASSWORD_TABLE.PASSWORD_SALT, nullable: false })
    passwordSalt: string;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: USER_PASSWORD_TABLE.USER })
    user: User;
}