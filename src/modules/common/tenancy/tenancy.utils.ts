import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config';
import { tenantConfig } from "../database/infrastructure/orm-config/tenant-orm.config";

export const tenantConnections: { [schemaName: string]: DataSource } = {};

export async function getTenantConnection(
    tenantId: string
): Promise<DataSource> {
    const connectionName = `tenant_${tenantId}`;

    if (tenantConnections[connectionName]) {
        const connection = tenantConnections[connectionName];
        return connection;
    } else {
        const dataSource = new DataSource({
            ...tenantConfig,
            name: connectionName,
            schema: connectionName,
            poolSize: Number(process.env.MAX_CONNECTION_POOL_SIZE),
        } as DataSourceOptions);

        await dataSource.initialize();

        tenantConnections[connectionName] = dataSource;

        return dataSource;
    }
}