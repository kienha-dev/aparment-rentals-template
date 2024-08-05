import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { PasswordUtils } from 'src/utils/password.util';
import { UserSession } from 'src/decorator/user.decorator';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return this.userService.verifyUserPassword(email, password);
  }

  generateAccessToken(user: Omit<User, 'password'>) {
    const userSession: UserSession = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(userSession);

    return {
      accessToken,
    };
  }
}
