import { DataSourceOptions } from "typeorm";
import 'dotenv/config'
import { Address } from "../../../address/domain/entities/address.entity";
import { ClinicUser } from "../../../../tenant/clinic-user/domain/entities/clinic-user.entity";
import { Appointment } from "../../../../tenant/appointment/domain/entities/appointment.entity";
import { ClinicUnit } from "../../../../public/clinic-unit/domain/entities/clinic-unit.entity";
import { Clinic } from "../../../../public/clinic/domain/entities/clinic.entity";
import { UserClinicUnit } from "../../../../public/user/domain/entities/user-clinic-unit.entity";
import { UserPassword } from "../../../../public/user/domain/entities/user-password.entity";
import { User } from "../../../../public/user/domain/entities/user.entity";
import { Tenant } from "../../../../public/tenant/domain/entities/tenant.entity";
import { Position } from "../../../../public/user/domain/entities/position.entity";
import { UserType } from "../../../../../modules/public/user/domain/entities/user-type.entity";

export const tenantConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        ClinicUser,
        Appointment,

        User,
        Clinic,
        ClinicUnit,
        UserClinicUnit,
        UserPassword,
        Address,
        Tenant,
        Position,
        UserType,
    ],
    synchronize: true,
    migrations: ['dist/migrations/tenanted/*.js'],
}