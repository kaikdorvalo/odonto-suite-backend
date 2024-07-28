import { USER_TYPE_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: DefaultTableNames.USER_TYPE })
export class UserType {

    @PrimaryGeneratedColumn({ name: USER_TYPE_TABLE.ID })
    id: number;

    @Column({ name: USER_TYPE_TABLE.NAME, unique: true, nullable: false })
    name: string;

    @Column({ name: USER_TYPE_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: USER_TYPE_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: USER_TYPE_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}