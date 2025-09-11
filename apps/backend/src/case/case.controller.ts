import { Body, Controller, Get, HttpException, HttpStatus, Param, Put, UseGuards } from "@nestjs/common";
import { DatabaseService } from "../global/database.service";
import { AuthGuard } from "../auth/auth.guard";
import { CurrentUser } from "../app/current-user.decorator";
import { User } from "@prisma/client";
import { Role } from "../role";
import { withCharacterCount } from "../report-utils";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Controller('case')
export class CaseController {
  constructor(private readonly db: DatabaseService) { }

  @Roles(Role.INVESTIGATOR, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async cases(@CurrentUser() user: User) {
    let where = undefined;
    if (user.role === Role.INVESTIGATOR) {
      const companyName = await this.getCompanyName(user);
      where = {
        company: { name: { equals: companyName } }
      };
    }
    const cases = await this.db.case.findMany({ where, include: { company: true } });
    return cases.map(withCharacterCount);
  }

  @Roles(Role.INVESTIGATOR, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('company/:companyName')
  async casesByCompany(
    @CurrentUser() user: User | undefined,
    @Param('companyName') companyName: string
  ) {
    if (user.role !== 'ADMIN') {
      throw new HttpException('Only allowed for admin', HttpStatus.FORBIDDEN);
    }
    return await this.db.case.findMany({
      where: { company: { name: { equals: companyName } } }
    });
  }

  @Roles(Role.INVESTIGATOR, Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':caseNo/status')
  async updateStatus(
    @Param("caseNo") caseNo: string,
    @Body('status') status: string
  ) {
    return await this.db.case.update({ where: { caseNo }, data: { status } });
  }

  // No role guard, because user needs to be able to check status of their
  // cases.
  @UseGuards(AuthGuard)
  @Get(':caseNo/status')
  async getStatus(@Param("caseNo") caseNo: string) {
    return await this.db.case.findUnique({ where: { caseNo } });
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
