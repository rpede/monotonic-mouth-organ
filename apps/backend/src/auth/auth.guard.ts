import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { User } from '@prisma/client';
import { TokenService } from '../global/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly token: TokenService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  private async validateRequest(request: Request & { user?: User }) {
    const token = request.cookies['TOKEN'];
    try {
      request.user = this.token.verify(token);
      return !!request.user;
    } catch {
      return false;
    }
  }
}
