import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV } from 'src/utils/constants';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.stategy';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get(ENV.JWT.ACCESS_TOKEN_SECRET),
        signOptions: {
          expiresIn: config.get(ENV.JWT.ACCESS_TOKEN_EXPIRATION_TIME),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
