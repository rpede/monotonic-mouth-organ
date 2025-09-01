import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from './database.service';
import { TokenService } from './token.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [DatabaseService, TokenService],
  exports: [DatabaseService, TokenService],
})
export class GlobalModule {}
