import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { json } from 'stream/consumers';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user) return request.user;
    try {
      const token = request.cookies['TOKEN'] as string;
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
);
