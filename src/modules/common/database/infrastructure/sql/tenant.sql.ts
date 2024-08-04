import { APPOINTMENT_TABLE, USER_TABLE } from "src/common/constants/column-names.constants";
import { SCHEMAS } from "src/common/constants/schemas.constants";
import { DefaultTableNames, SchemaTableNames } from "src/common/constants/table-names.constants";
import { EntityManager } from "typeorm";

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

            //Appointment table, user CONSTRAINT 
            `
                ALTER TABLE "${this.tenant}"."${SchemaTableNames.APPOINTMENT}"
                ADD CONSTRAINT "fk_user_userId"
                FOREIGN KEY ("${APPOINTMENT_TABLE.USER}")
                REFERENCES "${SCHEMAS.PUBLIC}"."${DefaultTableNames.USER}"("${USER_TABLE.ID}")
                ON DELETE NO ACTION ON UPDATE NO ACTION
            `,
        ]
    }

    async run(manager: EntityManager): Promise<void> {
        for (let i = 0; i < this.sql.length; i++) {
            await manager.query(this.sql[i]).catch((e) => { console.log(e) });
        }
    }
}