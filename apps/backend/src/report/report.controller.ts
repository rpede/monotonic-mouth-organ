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
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../current-user.decorator';
import { DatabaseService } from '../global/database.service';
import { ReportDto } from './report.dto';
import { readReport, saveReport, withCharacterCount } from '../report-utils';


@Controller('report')
export class ReportController {
  constructor(private readonly db: DatabaseService) { }

  @UseGuards(AuthGuard)
  @Get('/company/:companyName/:filename(*)')
  @Header('Content-Type', 'text/html')
  async companyReport(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string,
    @Param('filename') filename: string
  ) {
    const file = await readReport(companyName, filename);
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
    saveReport(companyName, filename, report.content);
    // Employees keep forgetting their casesNo.
    // Save it to avoid excessive support calls.
    await this.db.case.create({ data: { caseNo, userId: user.id, companyId: user.companyId } });
    return { caseNo };
  }

  @UseGuards(AuthGuard)
  @Get(':filename(*)')
  @Header('Content-Type', 'text/html')
  async report(
    @CurrentUser() user: User | undefined,
    @Param('filename') filename: string
  ) {
    const companyName = (await this.getCompanyName(user)) ?? 'Unknown';
    const file = await readReport(companyName, filename);
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
