import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { AuthModule } from '../auth/auth.module';
import { OrgsController } from './controllers/organization.controller';
import { OrgsService } from './services/organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization]), AuthModule],
  controllers: [OrgsController],
  providers: [OrgsService],
})
export class DicsModule {}
