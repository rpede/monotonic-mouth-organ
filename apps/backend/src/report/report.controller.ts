import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Case, User } from '@prisma/client';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import path from 'path';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { DatabaseService } from '../global/database.service';
import { Role } from '../role';
import { ReportDto } from './report.dto';

const dir = 'user-data/';

@Controller('report')
export class ReportController {
  constructor(private readonly db: DatabaseService) { }

  @UseGuards(AuthGuard)
  @Get()
  async reports(@CurrentUser() user: User) {
    if (user.role === Role.INVESTIGATOR) {
      const companyName = await this.getCompanyName(user);
      return await this.db.case.findMany({
        where: { company: { name: { equals: companyName } } }
      });
    } else {
      return await this.db.case.findMany();
    }
  }

  @UseGuards(AuthGuard)
  @Get('company/:companyName')
  async reportsForCompany(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string
  ) {
    if (user.role !== 'ADMIN') {
      throw new HttpException('Only allowed for admin', HttpStatus.FORBIDDEN);
    }
    const files = await fsp.readdir(path.join(dir, companyName));
    return files.map((file) => `${companyName}/${file}`);
  }

  @UseGuards(AuthGuard)
  @Get('/company/:companyName/:filename(*)')
  @Header('Content-Type', 'text/html')
  async companyReport(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string,
    @Param('filename') filename: string
  ) {
    const file = await fsp.readFile(path.join(dir, companyName, filename));
    return file.toString();
  }

  @Post()
  async save(
    @CurrentUser() user: User | undefined,
    @Body() report: ReportDto
  ) {
    const caseNo = (Date.now() / 1000 / 60).toFixed();
    const filename = `${caseNo}.html`;
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    const comDir = path.join(dir, companyName);
    if (!fs.existsSync(comDir)) await fsp.mkdir(comDir);
    fsp.writeFile(path.join(comDir, filename), report.content);
    // Employees keep forgetting their casesNo.
    // Save it to avoid excessive support calls.
    await this.saveCaseNo(user, caseNo);
    return { caseNo };
  }

  @UseGuards(AuthGuard)
  @Put(':caseNo/status')
  async updateStatus(@Param("caseNo") caseNo, @Body('status') status: string) {
    return await this.db.case.update({ where: { caseNo }, data: { status } });
  }

  @UseGuards(AuthGuard)
  @Get(':filename(*)')
  @Header('Content-Type', 'text/html')
  async report(
    @CurrentUser() user: User | undefined,
    @Param('filename') filename: string
  ) {
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    const file = await fsp.readFile(path.join(dir, companyName, filename));
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

  private async saveCaseNo(user: User, caseNo: string) {
    await this.db.case.create({ data: { caseNo, userId: user.id } })
  }
}
