import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordUtils } from 'src/utils/password.util';
import { DatabaseModule } from 'src/database/prisma.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.stategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, PasswordUtils, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
