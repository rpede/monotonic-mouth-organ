import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  generate(user: User) {
    return this.jwt.sign(user);
  }

  verify(token: string): User | null {
    try {
      return this.jwt.verify<User>(token);
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  user(token: string): User {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
