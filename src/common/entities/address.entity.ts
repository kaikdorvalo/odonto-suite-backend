import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DefaultTableNames } from "../../common/constants/table-names.constants";
import { ADDRESS_TABLE } from "../../common/constants/column-names.constants";

@Entity({ name: DefaultTableNames.ADDRESS })
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: ADDRESS_TABLE.STREET, nullable: false })
    street: string;

    @Column({ name: ADDRESS_TABLE.NUMBER, nullable: false })
    number: string;

    @Column({ name: ADDRESS_TABLE.NEIGHBORHOOD, nullable: false })
    neighborhood: string;

    @Column({ name: ADDRESS_TABLE.CITY, nullable: false })
    city: string;

    @Column({ name: ADDRESS_TABLE.STATE, nullable: false })
    state: string;

    @Column({ name: ADDRESS_TABLE.POSTAL_CODE, nullable: false })
    postalCode: string;

    @Column({ name: ADDRESS_TABLE.COUNTRY, nullable: false })
    country: string;

    @Column({ name: ADDRESS_TABLE.COMPLEMENT, nullable: true })
    complement: string;

    @Column({ name: ADDRESS_TABLE.REFERENCE, nullable: true })
    reference: string;

    @Column({ name: ADDRESS_TABLE.ACTIVE, nullable: false })
    active: boolean

    @Column({ name: ADDRESS_TABLE.CREATED_AT, nullable: false })
    createdAt: Date;

    @Column({ name: ADDRESS_TABLE.UPDATED_AT, nullable: false })
    updatedAt: Date;
}