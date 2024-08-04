import { CLINIC_UNIT_POSITION_TABLE } from "src/common/constants/column-names.constants";
import { DefaultTableNames } from "src/common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(DefaultTableNames.CLINIC_UNIT_POSITION)
export class ClinicUnitPosition {

    @PrimaryGeneratedColumn({ name: CLINIC_UNIT_POSITION_TABLE.ID })
    id: number;

    @Column({ name: CLINIC_UNIT_POSITION_TABLE.NAME, nullable: false })
    name: string;

    @Column({ name: CLINIC_UNIT_POSITION_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_UNIT_POSITION_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_UNIT_POSITION_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;


}