import { MigrationInterface, QueryRunner } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export class Migration1722373706003 implements MigrationInterface {
  name = 'Migration1722373706003'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection.options as PostgresConnectionOptions;
    
  }
}
