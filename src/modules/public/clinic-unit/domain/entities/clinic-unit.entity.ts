import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { CLINIC_UNIT_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Address } from "../../../../common/address/domain/entities/address.entity";
import { Clinic } from "../../../clinic/domain/entities/clinic.entity";
import { UserClinicUnit } from "../../../user/domain/entities/user-clinic-unit.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: DefaultTableNames.CLINIC_UNIT, schema: SCHEMAS.PUBLIC })
export class ClinicUnit {

    @PrimaryGeneratedColumn({ name: CLINIC_UNIT_TABLE.ID })
    id: string;

    @Column({ name: CLINIC_UNIT_TABLE.NAME, nullable: false })
    name: string;

    @OneToOne(() => Clinic, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_TABLE.CLINIC })
    clinic: Clinic

    @OneToOne(() => Address, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_TABLE.ADDRESS })
    address: Address;

    @OneToMany(() => UserClinicUnit, userClinicUnit => userClinicUnit.clinicUnit, { nullable: false })
    userClinicUnits: UserClinicUnit[];

    @Column({ name: CLINIC_UNIT_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_UNIT_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_UNIT_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}