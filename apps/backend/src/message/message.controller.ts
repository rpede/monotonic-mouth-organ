import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { createReadStream, rmSync } from 'fs';
import * as fs from 'fs/promises';
import { userInfo } from 'os';
import path from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { DatabaseService } from '../global/database.service';
import { Role } from '../role';
import { MessageDto } from './message.dto';

const dir = 'user-data/';

@Controller('message')
export class MessageController {
  constructor(private readonly db: DatabaseService) {}

  @UseGuards(AuthGuard)
  @Get()
  async messages(@CurrentUser() user: User) {
    if (user.role === Role.MANAGER) {
      const companyName = await this.getCompanyName(user);
      return await fs.readdir(path.join(dir, companyName));
    } else {
      return (await fs.readdir(dir)).filter((fn) => !fn.startsWith('.'));
    }
  }

  @UseGuards(AuthGuard)
  @Get('company/:companyName')
  async messagesForCompany(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string
  ) {
    if (user.role !== 'ADMIN') {
      throw new HttpException('Only allowed for admin', HttpStatus.FORBIDDEN);
    }
    const files = await fs.readdir(path.join(dir, companyName));
    return files.map((file) => `${companyName}/${file}`);
  }

  @UseGuards(AuthGuard)
  @Get('/company/:companyName/:filename(*)')
  @Header('Content-Type', 'text/html')
  async companyMessage(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string,
    @Param('filename') filename: string
  ) {
    const file = await fs.readFile(path.join(dir, companyName, filename));
    return file.toString();
  }

  @Post()
  async save(
    @CurrentUser() user: User | undefined,
    @Body() message: MessageDto
  ) {
    const timestamp = new Date().toISOString();
    const filename = `${timestamp}_${message.from}.html`;
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    fs.writeFile(path.join(dir, companyName, filename), message.content);
    return 'OK';
  }

  @UseGuards(AuthGuard)
  @Get(':filename(*)')
  @Header('Content-Type', 'text/html')
  async message(
    @CurrentUser() user: User | undefined,
    @Param('filename') filename: string
  ) {
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    const file = await fs.readFile(path.join(dir, companyName, filename));
    return file.toString();
  }

  private async getCompanyName(user?: User) {
    try {
      const company = await this.db.company.findUnique({
        where: { id: user?.companyId },
      });
      return company.name;
    }
    catch {
      return null;
    }
  }
}
