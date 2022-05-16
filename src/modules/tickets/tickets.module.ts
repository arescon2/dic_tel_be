/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entityes/priem/person.entity';
import { CategoryTicket } from 'src/entityes/tickets/categoryTicket.entity';
import { Issue } from 'src/entityes/tickets/issue.entity';
import { StatusTicket } from 'src/entityes/tickets/statusTicket.entity';
import { TypeTicket } from 'src/entityes/tickets/typeTicket.entity';
import { AuthModule } from '../auth/auth.module';

import {
  CategoryTicketController,
  DicsTicketController,
  TypesTicketController,
} from './controller/dicsTicket.controller';
import { IssueController } from './controller/issues.controller';

import { DicsTicketService } from './services/dicsTicket.service';
import { IssuesService } from './services/issues.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusTicket, CategoryTicket, TypeTicket, Issue, Person]),
    AuthModule,
  ],
  controllers: [
    DicsTicketController,
    CategoryTicketController,
    TypesTicketController,
    IssueController,
  ],
  providers: [DicsTicketService, IssuesService],
})
export class TicketsModule {}
