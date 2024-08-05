import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ENV } from 'src/utils/constants';
import { UserSession } from 'src/decorator/user.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(ENV.JWT.ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: UserSession) {
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }
    return user;
  }
}
