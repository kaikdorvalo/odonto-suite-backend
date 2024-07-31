import { LICENSE_TYPE_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: DefaultTableNames.LICENSE_TYPE })
export class LicenseType {

    @PrimaryGeneratedColumn({ name: LICENSE_TYPE_TABLE.ID })
    id: number;

    @Column({ name: LICENSE_TYPE_TABLE.TYPE, nullable: false })
    type: string;

    @Column({ name: LICENSE_TYPE_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: LICENSE_TYPE_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: LICENSE_TYPE_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}