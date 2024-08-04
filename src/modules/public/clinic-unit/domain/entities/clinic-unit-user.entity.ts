import { User } from "src/modules/public/user/domain/entities/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ClinicUnit } from "./clinic-unit.entity";
import { ClinicUnitPosition } from "./clinic-unit-position.entity";
import { DefaultTableNames } from "src/common/constants/table-names.constants";
import { CLINIC_UNIT_USER_TABLE } from "src/common/constants/column-names.constants";

@Entity(DefaultTableNames.CLINIC_UNIT_USER)
@Unique([CLINIC_UNIT_USER_TABLE.USER, CLINIC_UNIT_USER_TABLE.CLINIC_UNIT])
export class ClinicUnitUser {

    @PrimaryGeneratedColumn({ name: CLINIC_UNIT_USER_TABLE.ID })
    id: number;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.USER })
    user: User;

    @OneToOne(() => ClinicUnit, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.CLINIC_UNIT })
    clinicUnit: ClinicUnit;

    @OneToOne(() => ClinicUnitPosition, { nullable: false })
    @JoinColumn({ name: CLINIC_UNIT_USER_TABLE.POSITION })
    position: ClinicUnitPosition;

    @Column({ name: CLINIC_UNIT_USER_TABLE.ACTIVE, nullable: false })
    active: boolean

    @Column({ name: CLINIC_UNIT_USER_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_UNIT_USER_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}