import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { USER_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Address } from "../../../../common/address/domain/entities/address.entity";
import { IndexNames } from "../../../../../common/constants/index-names.constants";
import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { UserType } from "./user-type.entity";
import { ClinicUnitUser } from "../../../../../modules/public/clinic-unit/domain/entities/clinic-unit-user.entity";

@Entity({ name: DefaultTableNames.USER, schema: SCHEMAS.PUBLIC })
export class User {

    @PrimaryGeneratedColumn({ name: USER_TABLE.ID })
    id: number;

    @Column({ name: USER_TABLE.FIRST_NAME, nullable: false })
    @Index(IndexNames.NAME1)
    firstName: string;

    @Column({ name: USER_TABLE.LAST_NAME, nullable: false })
    @Index(IndexNames.NAME2)
    lastName: string;

    @Column({ name: USER_TABLE.CPF, nullable: false, unique: true })
    @Index(IndexNames.CPF)
    cpf: string;

    @Column({ name: USER_TABLE.EMAIL, nullable: false, unique: true })
    @Index(IndexNames.EMAIL)
    email: string;

    @OneToMany(() => ClinicUnitUser, clinicUnitUser => clinicUnitUser.user)
    clinicUnitUser: ClinicUnitUser[];

    @Column({ name: USER_TABLE.DATE_OF_BIRTH, nullable: false })
    dateOfBirth: Date;

    @OneToOne(() => Address, { nullable: true })
    @JoinColumn({ name: USER_TABLE.USER_ADDRESS_ID })
    address: Address;

    @OneToOne(() => UserType, { nullable: false })
    @JoinColumn({ name: USER_TABLE.USER_TYPE_ID })
    userType: UserType;

    @Column({ name: USER_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: USER_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: USER_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}