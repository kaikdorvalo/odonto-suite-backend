import { LICENSE_TABLE } from "../../../../../common/constants/column-names.constants";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LicenseType } from "./license-type.entity";
import { User } from "../../../../../modules/public/user/domain/entities/user.entity";
import { IndexNames } from "../../../../../common/constants/index-names.constants";

@Entity({ name: DefaultTableNames.LICENSE })
export class License {

    @PrimaryGeneratedColumn({ name: LICENSE_TABLE.ID })
    id: number;

    @Column({ name: LICENSE_TABLE.KEY, nullable: false, unique: true })
    @Index(IndexNames.LICENSE_KEY)
    key: string;

    @Column({ name: LICENSE_TABLE.PERIOD, nullable: false })
    period: number;

    @Column({ name: LICENSE_TABLE.UNITS_AMOUNT, nullable: false })
    unitsAmount: number;

    @OneToOne(() => LicenseType, { nullable: false })
    @JoinColumn({ name: LICENSE_TABLE.LICENSE_TYPE })
    licenseType: LicenseType;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn({ name: LICENSE_TABLE.ACTIVATED_BY })
    activatedBy: User;

    @Column({ name: LICENSE_TABLE.ACTIVATION_DATE, nullable: true })
    activationDate: Date;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn({ name: LICENSE_TABLE.GENERATED_BY })
    generatedBy: User;

    @Column({ name: LICENSE_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: LICENSE_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: LICENSE_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}