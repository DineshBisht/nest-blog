import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './local.authentication.guard';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from '../constants/jwtconstant';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    UsersModule,

    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthenticationGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
