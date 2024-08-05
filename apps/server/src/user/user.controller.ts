import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller({ path: 'user', version: '1' })
export class UserController {
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Req() req: Request) {
    const user = req.user;
    return user;
  }
}
