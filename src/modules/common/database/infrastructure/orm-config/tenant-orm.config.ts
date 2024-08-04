import { DataSourceOptions } from "typeorm";
import 'dotenv/config'
import { Address } from "../../../address/domain/entities/address.entity";
import { Appointment } from "../../../../tenant/appointment/domain/entities/appointment.entity";
import { ClinicUnit } from "../../../../public/clinic-unit/domain/entities/clinic-unit.entity";
import { Clinic } from "../../../../public/clinic/domain/entities/clinic.entity";
import { UserPassword } from "../../../../public/user/domain/entities/user-password.entity";
import { User } from "../../../../public/user/domain/entities/user.entity";
import { Tenant } from "../../../../public/tenant/domain/entities/tenant.entity";
import { UserType } from "../../../../../modules/public/user/domain/entities/user-type.entity";
import { ClinicUnitUser } from "../../../../../modules/public/clinic-unit/domain/entities/clinic-unit-user.entity";
import { ClinicUnitPosition } from "../../../../../modules/public/clinic-unit/domain/entities/clinic-unit-position.entity";

export const tenantConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [
        Appointment,

        User,
        Clinic,
        ClinicUnit,
        ClinicUnitUser,
        ClinicUnitPosition,
        UserPassword,
        Address,
        Tenant,
        UserType,
    ],
    synchronize: true,
    migrations: ['dist/migrations/tenanted/*.js'],
}