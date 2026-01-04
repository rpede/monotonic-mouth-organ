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
import { CurrentUser } from '../app/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly db: DatabaseService) { }

  @UseGuards(AuthGuard)
  @Get()
  users(@CurrentUser() { companyId }: User) {
    const filter = companyId ? { where: { companyId } } : undefined;
    return this.db.user.findMany(filter);
  }

  @Get(':id')
  user(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.db.user.findUnique({
      where: { id },
      include: { company: true },
    });
  }
}
