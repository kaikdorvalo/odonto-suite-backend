import { APPOINTMENT_TABLE, CLINIC_USER_TABLE, POSITION_TABLE, USER_TABLE } from "src/common/constants/column-names.constants";
import { SCHEMAS } from "src/common/constants/schemas.constants";
import { DefaultTableNames, SchemaTableNames } from "src/common/constants/table-names.constants";
import { DataSource, EntityManager } from "typeorm";

export class TenantSql {
    tenant: string
    sql: string[]

    constructor(tenant: string) {
        this.tenant = tenant;

        this.sql = [
            `
                CREATE TABLE "${this.tenant}"."${SchemaTableNames.APPOINTMENT}" (
                    "${APPOINTMENT_TABLE.ID}" SERIAL NOT NULL,
                    "${APPOINTMENT_TABLE.USER}" integer NOT NULL,
                    "${APPOINTMENT_TABLE.APPOINTMENT_TIME}" date NOT NULL,
                    "${APPOINTMENT_TABLE.DESCRIPTION}" text NOT NULL,
                    "${APPOINTMENT_TABLE.ACTIVE}" boolean NOT NULL,
                    "${APPOINTMENT_TABLE.CREATED_AT}" date NOT NULL,
                    "${APPOINTMENT_TABLE.UPDATED_AT}" date NOT NULL
                )
            `,

            `
                CREATE TABLE "${this.tenant}"."${SchemaTableNames.CLINIC_USER}" (
                    "${CLINIC_USER_TABLE.ID}" SERIAL NOT NULL,
                    "${CLINIC_USER_TABLE.USER}" integer NOT NULL,
                    "${CLINIC_USER_TABLE.POSITION}" integer NOT NULL,
                    "${CLINIC_USER_TABLE.ACTIVE}" boolean NOT NULL,
                    "${CLINIC_USER_TABLE.CREATED_AT}" date NOT NULL,
                    "${CLINIC_USER_TABLE.UPDATED_AT}" date NOT NULL
                )  
            `,

            //Appointment table, user CONSTRAINT 
            `
                ALTER TABLE "${this.tenant}"."${SchemaTableNames.APPOINTMENT}"
                ADD CONSTRAINT "fk_user_userId"
                FOREIGN KEY ("${APPOINTMENT_TABLE.USER}")
                REFERENCES "${SCHEMAS.PUBLIC}"."${DefaultTableNames.USER}"("${USER_TABLE.ID}")
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `,
            //ClinicUser table, user CONSTRAINT
            `
                ALTER TABLE "${this.tenant}"."${SchemaTableNames.CLINIC_USER}"
                ADD CONSTRAINT "fk_user_userId"
                FOREIGN KEY ("${CLINIC_USER_TABLE.USER}")
                REFERENCES "${SCHEMAS.PUBLIC}"."${DefaultTableNames.USER}"("${USER_TABLE.ID}")
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `,
            //CliniciUser table, position CONSTRAINT
            `
                ALTER TABLE "${this.tenant}"."${SchemaTableNames.CLINIC_USER}"
                ADD CONSTRAINT "fk_position_positionId"
                FOREIGN KEY ("${CLINIC_USER_TABLE.POSITION}")
                REFERENCES "${SCHEMAS.PUBLIC}"."${DefaultTableNames.POSITION}"("${POSITION_TABLE.ID}")
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `
        ]
    }

    async run(manager: EntityManager): Promise<void> {
        for (let i = 0; i < this.sql.length; i++) {
            await manager.query(this.sql[i]).catch((e) => { console.log(e) });
        }
    }
}