import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DefaultTableNames } from "../../../../../common/constants/table-names.constants";
import { CLINIC_TABLE } from "../../../../../common/constants/column-names.constants";
import { User } from "../../../user/domain/entities/user.entity";
import { SCHEMAS } from "../../../../../common/constants/schemas.constants";

@Entity({ name: DefaultTableNames.CLINIC, schema: SCHEMAS.PUBLIC })
export class Clinic {

    @PrimaryGeneratedColumn({ name: CLINIC_TABLE.ID })
    id: number;

    @Column({ name: CLINIC_TABLE.NAME, nullable: false })
    name: string;

    @Column({ name: CLINIC_TABLE.TENANT_NAME, nullable: false })
    tenantName: string;

    @Column({ name: CLINIC_TABLE.CNPJ, nullable: false })
    cnpj: string;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: CLINIC_TABLE.CLINIC_OWNER })
    clinicOwner: User;


    @Column({ name: CLINIC_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}