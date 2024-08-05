//Decorator to get User session information from dashboard portal
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Role } from '@prisma/client';

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export class UserSession {
  readonly id: string;
  readonly role: Role;
}
