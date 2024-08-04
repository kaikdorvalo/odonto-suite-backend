import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { CLINIC_UNIT_POSITION_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: DefaultTableNames.CLINIC_UNIT_POSITION, schema: SCHEMAS.PUBLIC })
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