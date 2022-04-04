import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { AuthModule } from '../auth/auth.module';
import { OrgsController } from './controllers/organization.controller';
import { OtdelsController } from './controllers/otdels.controller';
import { OrgsService } from './services/organization.service';
import { OtdelsService } from './services/otdels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Otdels]), AuthModule],
  controllers: [OrgsController, OtdelsController],
  providers: [OrgsService, OtdelsService],
})
export class DicsModule {}
