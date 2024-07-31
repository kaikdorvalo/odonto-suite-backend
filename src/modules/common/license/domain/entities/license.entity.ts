import { LICENSE_TABLE } from "src/common/constants/column-names.constants";
import { DefaultTableNames } from "src/common/constants/table-names.constants";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LicenseType } from "./license-type.entity";

@Entity({ name: DefaultTableNames.LICENSE })
export class License {

    @PrimaryGeneratedColumn({ name: LICENSE_TABLE.ID })
    id: number;

    @Column({ name: LICENSE_TABLE.KEY, nullable: false })
    key: string;

    @Column({ name: LICENSE_TABLE.TIME, nullable: false })
    time: number;

    @Column({ name: LICENSE_TABLE.UNITS_AMOUNT, nullable: false })
    unitsAmount: number;

    @OneToOne(() => LicenseType, { nullable: false })
    @JoinColumn({ name: LICENSE_TABLE.LICENSE_TYPE })
    licenseType: LicenseType;

    @Column({ name: LICENSE_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: LICENSE_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: LICENSE_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}