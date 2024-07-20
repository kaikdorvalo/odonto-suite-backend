import { SCHEMAS } from "../../../../../common/constants/schemas.constants";
import { TENANT_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: DefaultTableNames.TENANT, schema: SCHEMAS.PUBLIC })
export class Tenant {
    @PrimaryGeneratedColumn({ name: TENANT_TABLE.ID })
    id: number;

    @Column({ name: TENANT_TABLE.NAME, nullable: false, unique: true })
    name: string;

    @Column({ name: TENANT_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: TENANT_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: TENANT_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}