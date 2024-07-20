import { CLINIC_USER_TABLE } from "../../../../../common/constants/column-names.constants";
import { SchemaTableNames } from "../../../../../common/constants/table-names.constants";
import { Position } from "../../../../public/user/domain/entities/position.entity";
import { User } from "../../../../public/user/domain/entities/user.entity";
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: SchemaTableNames.CLINIC_USER })
export class ClinicUser {
    @PrimaryGeneratedColumn({ name: CLINIC_USER_TABLE.ID })
    id: number;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: CLINIC_USER_TABLE.USER })
    @Index({ unique: true })
    user: User;

    @OneToOne(() => Position, { nullable: true })
    @JoinColumn({ name: CLINIC_USER_TABLE.POSITION })
    position: Position;

    @Column({ name: CLINIC_USER_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: CLINIC_USER_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: CLINIC_USER_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}