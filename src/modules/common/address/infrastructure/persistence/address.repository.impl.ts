import { Inject } from "@nestjs/common";
import { DataSources } from "src/common/constants/data-sources.constants";
import { Address } from "../../domain/entities/address.entity";
import { DataSource, Repository } from "typeorm";
import { AddressRepository } from "../../domain/repositories/address.repository";

export class AddressRepositoryImpl extends Repository<Address> implements AddressRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(Address, dataSource.createEntityManager());
    }


}