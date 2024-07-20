import { DataSources } from '../../../common/constants/data-sources.constants';
import { DataSource } from 'typeorm';
import 'dotenv/config'
import { publicConfig } from './infrastructure/orm-config/public-orm.config';

const defaultDataSource = new DataSource(publicConfig)

export const databaseProviders = [
    {

        provide: DataSources.DEFAULT_DATASOURCE,
        useFactory: async () => {
            const dataSource = defaultDataSource;
            return dataSource.initialize();
        },
    },
];

export default defaultDataSource;