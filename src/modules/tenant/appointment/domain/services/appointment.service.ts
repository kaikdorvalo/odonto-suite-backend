import { Inject, Injectable } from "@nestjs/common";
import { DataSources } from "src/common/constants/data-sources.constants";
import { DataSource } from "typeorm";

@Injectable()
export class AppointmentService {
    constructor(@Inject(DataSources.TENANT_DATASOURCE) private tenantDataSource: DataSource) { }

}
