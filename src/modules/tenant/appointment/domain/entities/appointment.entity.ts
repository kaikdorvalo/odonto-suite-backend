import { SchemaTableNames } from "../../../../../common/constants/table-names.constants";
import { APPOINTMENT_TABLE } from "../../../../../common/constants/column-names.constants";
import { User } from "../../../../public/user/domain/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: SchemaTableNames.APPOINTMENT })
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { nullable: false })
    @JoinColumn({ name: APPOINTMENT_TABLE.USER })
    user: User;

    @Column({ name: APPOINTMENT_TABLE.APPOINTMENT_TIME, nullable: false })
    appointmentTime: Date;

    @Column({ name: APPOINTMENT_TABLE.DESCRIPTION, nullable: false })
    description: string;

    @Column({ name: APPOINTMENT_TABLE.ACTIVE, nullable: false })
    active: boolean;

    @Column({ name: APPOINTMENT_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: APPOINTMENT_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}