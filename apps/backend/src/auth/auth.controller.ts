import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DatabaseService } from '../global/database.service';
import { TokenService } from '../global/token.service';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly token: TokenService,
    private readonly db: DatabaseService,
  ) { }

  @Post('login')
  @Header('Content-Type', 'application/json')
  async login(
    @Body() credentials: CredentialsDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const token = await this.authService.login(credentials);
      response.cookie('TOKEN', token);
      return { message: token ? 'OK' : 'ERROR' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('logout')
  @Header('Content-Type', 'application/json')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('TOKEN');
  }

  @Get('whoami')
  @Header('Content-Type', 'application/json')
  async whoami(@Req() req: Request) {
    const token = req.cookies['TOKEN'];
    if (!token) return null;
    const encodedPayload = token.split('.')[1];
    const payload = Buffer.from(encodedPayload, "base64").toString('utf-8');
    const user = eval(`(${payload})`) as User;
    if (!user.companyId) return user;
    const company = await this.db.company.findFirst({ where: { id: user.companyId } });
    return { ...user, company };
  }
}
