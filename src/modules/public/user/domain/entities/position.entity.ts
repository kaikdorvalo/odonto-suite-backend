import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { POSITION_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: DefaultTableNames.POSITION, schema: SCHEMAS.PUBLIC })
export class Position {
    @PrimaryGeneratedColumn({ name: POSITION_TABLE.ID })
    id: number;

    @Column({ name: POSITION_TABLE.NAME, unique: true, nullable: false })
    name: string;

    @Column({ name: POSITION_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: POSITION_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: POSITION_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}