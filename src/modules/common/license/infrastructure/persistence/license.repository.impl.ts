import { DataSource, Repository } from "typeorm";
import { License } from "../../domain/entities/license.entity";
import { LicenseRepository } from "../../domain/repositories/license.repository";
import { Inject } from "@nestjs/common";
import { DataSources } from "src/common/constants/data-sources.constants";

export class LicenseRepositoryImpl extends Repository<License> implements LicenseRepository {
    constructor(@Inject(DataSources.DEFAULT_DATASOURCE) private dataSource: DataSource) {
        super(License, dataSource.createEntityManager());
    }

    async findByKey(key: string): Promise<License | null> {
        return await this.findOneBy({ key: key });
    }
}