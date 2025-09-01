import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseService } from '../global/database.service';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  companies() {
    return this.db.company.findMany();
  }

  @Get(':id')
  company(@Param('id', ParseIntPipe) id: number) {
    return this.db.company.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }
}
