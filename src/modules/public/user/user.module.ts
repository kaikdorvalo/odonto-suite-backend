import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { DatabaseModule } from '../../common/database/database.module';
import { Repositories } from 'src/common/constants/respositories.constants';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Repositories.USER_REPOSITORY,
      useClass: UserRepositoryImpl
    }
  ],
  exports: [UserService]
})
export class UserModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(TenancyMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
