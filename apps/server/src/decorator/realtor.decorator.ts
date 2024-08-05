import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export const Realtor = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export class RealtorSession {
  @IsNotEmpty()
  readonly secret: string;

  @IsNotEmpty()
  readonly projectId: string;
}
