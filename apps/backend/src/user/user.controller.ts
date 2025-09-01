import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { DatabaseService } from '../global/database.service';
import { CurrentUser } from '../current-user.decorator';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly db: DatabaseService) {}
  @Get()
  users(@CurrentUser() { companyId }: User) {
    return this.db.user.findMany({ where: { companyId } });
  }

  @Get(':id')
  user(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.db.user.findFirst({
      where: { id, companyId: user.companyId ?? undefined },
      include: { company: true },
    });
  }
}
