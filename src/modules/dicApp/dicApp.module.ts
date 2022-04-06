import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entityes/dics/employee.entity';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { AuthModule } from '../auth/auth.module';
import { DicApssController } from './dicApp.controller';
import { DicAppService } from './dicApp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, Otdels, Employee]),
    AuthModule,
  ],
  controllers: [DicApssController],
  providers: [DicAppService],
})
export class DicAppModule {}
