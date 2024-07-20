import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { USER_CLINIC_UNIT_TABLE } from "../../../../../common/constants/column-names.constants";
import { ClinicUnit } from "../../../clinic-unit/domain/entities/clinic-unit.entity";
import { SCHEMAS } from "../../../../../common/constants/schemas.constants";

@Entity({ name: DefaultTableNames.USER_CLINIC_UNIT, schema: SCHEMAS.PUBLIC })
export class UserClinicUnit {
    @PrimaryGeneratedColumn({ name: USER_CLINIC_UNIT_TABLE.ID })
    id: number;

    @ManyToOne(() => User, user => user.userClinicUnits, { nullable: false })
    @JoinColumn({ name: USER_CLINIC_UNIT_TABLE.USER })
    user: User;

    @ManyToOne(() => ClinicUnit, clinicUnit => clinicUnit.userClinicUnits, { nullable: false })
    @JoinColumn({ name: USER_CLINIC_UNIT_TABLE.CLINIC_UNIT })
    clinicUnit: ClinicUnit;

    @Column({ name: USER_CLINIC_UNIT_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: USER_CLINIC_UNIT_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date
}