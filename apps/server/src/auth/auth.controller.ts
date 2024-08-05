import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalAuthGuard } from './guard/local.guard';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiBody({
    type: SignInDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Req() req: Request) {
    const user = req.user;
    const { accessToken } = this.authService.generateAccessToken(user);
    return { accessToken, user };
  }

  @ApiBody({
    type: SignUpDto,
  })
  @Post('/sign-up')
  async signUp(@Body() signUpPayload: SignUpDto) {
    const user = await this.userService.create(signUpPayload);
    const { accessToken } = this.authService.generateAccessToken(user);
    return { accessToken, user };
  }
}
