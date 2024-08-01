import { Module } from '@nestjs/common';
import { UserModule } from '../../../modules/public/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'
import { AuthService } from './domain/service/auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserSignInUseCase } from './application/use-case/user-sign-in.use-case/user-sign-in.use-case';
import { UserService } from 'src/modules/public/user/domain/services/user.service';
import { MasterGuard } from './presentation/guards/master.guard';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [
        AuthService,
        UserSignInUseCase
    ],
    controllers: [
        AuthController
    ],
})
export class AuthModule { }