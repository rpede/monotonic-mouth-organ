import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from '../global/database.service';
import { GlobalModule } from '../global/global.module';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { ReportModule } from '../report/report.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule, CompanyModule, ReportModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule { }
