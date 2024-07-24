import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './domain/services/user.service';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { DatabaseModule } from '../../common/database/database.module';
import { Repositories } from 'src/common/constants/respositories.constants';
import { UserPasswordRepositoryImpl } from './infrastructure/persistence/user-password.repository.impl';
import { UserPasswordService } from './domain/services/user-password.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserPasswordService,
    {
      provide: Repositories.USER_REPOSITORY,
      useClass: UserRepositoryImpl
    },
    {
      provide: Repositories.USER_PASSWORD_REPOSITORY,
      useClass: UserPasswordRepositoryImpl
    }
  ],
  exports: [
    UserService,
    UserPasswordService
  ]
})
export class UserModule { }
