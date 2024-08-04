import { User } from "../../../../../modules/public/user/domain/entities/user.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ClinicUnit } from "./clinic-unit.entity";
import { ClinicUnitPosition } from "./clinic-unit-position.entity";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { CLINIC_UNIT_USER_TABLE } from "../../../../../common/constants/column-names.constants";
import { SCHEMAS } from "../../../../../common/constants/schemas.constants";

@Entity({ name: DefaultTableNames.CLINIC_UNIT_USER, schema: SCHEMAS.PUBLIC })
@Unique([CLINIC_UNIT_USER_TABLE.CLINIC_UNIT, CLINIC_UNIT_USER_TABLE.USER])
export class ClinicUnitUser {

    @PrimaryGeneratedColumn({ name: CLINIC_UNIT_USER_TABLE.ID })
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.USER })
    user: User;

    @OneToOne(() => ClinicUnitPosition, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.POSITION })
    position: ClinicUnitPosition;

    @ManyToOne(() => ClinicUnit, clinicUnit => clinicUnit.id)
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.CLINIC_UNIT })
    clinic_unit: ClinicUnit;

    @Column({ name: CLINIC_UNIT_USER_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_UNIT_USER_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_UNIT_USER_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}