import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { CLINIC_UNIT_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Address } from "../../../../common/address/domain/entities/address.entity";
import { Clinic } from "../../../clinic/domain/entities/clinic.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../../../modules/public/user/domain/entities/user.entity";
import { Tenant } from "../../../../../modules/public/tenant/domain/entities/tenant.entity";
import { ClinicUnitUser } from "./clinic-unit-user.entity";


@Entity({ name: DefaultTableNames.CLINIC_UNIT, schema: SCHEMAS.PUBLIC })
export class ClinicUnit {

    @PrimaryGeneratedColumn({ name: CLINIC_UNIT_TABLE.ID })
    id: string;

    @Column({ name: CLINIC_UNIT_TABLE.NAME, nullable: false })
    name: string;

    @OneToOne(() => Tenant, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_TABLE.TENANT })
    tenant: Tenant;

    @OneToOne(() => Clinic, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_TABLE.CLINIC })
    clinic: Clinic

    @OneToMany(() => ClinicUnitUser, clinicUnitUser => clinicUnitUser.clinic_unit)
    clinicUnitUser: ClinicUnitUser[]

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({})
    unitManager: User;

    @OneToOne(() => Address, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_TABLE.ADDRESS })
    address: Address;

    @Column({ name: CLINIC_UNIT_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_UNIT_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_UNIT_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}