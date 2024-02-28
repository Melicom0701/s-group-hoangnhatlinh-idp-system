import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInf } from './loginInf.entity';
import { LoginInfService } from './loginInf.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginInf])],
  providers: [LoginInfService],
  exports: [LoginInfService],
})
export class LoginInfModule {}
