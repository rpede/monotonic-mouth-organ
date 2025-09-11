import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { DatabaseService } from "../global/database.service";

@UseGuards(AuthGuard)
@Controller('support')
export class SupportController {
  constructor(private readonly db: DatabaseService) { }

  @Get('case')
  cases(@Query("email") email: string) {
    return this.db.case.findMany({ where: { user: { email: { equals: email } } } })

  }
}
