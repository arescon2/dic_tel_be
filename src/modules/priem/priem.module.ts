import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Person } from 'src/entityes/priem/person.entity';
import { AuthModule } from '../auth/auth.module';
import { OrgsService } from '../dics/services/organization.service';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Organization]), AuthModule],
  controllers: [PersonController],
  providers: [PersonService, OrgsService],
})
export class PriemModule {}
