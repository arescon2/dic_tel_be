import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entityes/priem/person.entity';
import { AuthModule } from '../auth/auth.module';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person]), AuthModule],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PriemModule {}
