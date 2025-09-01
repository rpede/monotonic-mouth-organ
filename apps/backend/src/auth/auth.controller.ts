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
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TokenService } from '../global/token.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly token: TokenService
  ) {}

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

  @UseGuards(AuthGuard)
  @Get('whoami')
  @Header('Content-Type', 'application/json')
  whoami(@Req() req: Request) {
    return this.token.user(req.cookies['TOKEN']);
  }
}
