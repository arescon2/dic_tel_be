import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryTicket } from 'src/entityes/dics/categoryTicket.entity';
import { Employee } from 'src/entityes/dics/employee.entity';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { Posts } from 'src/entityes/dics/posts.entity';
import { StatusTicket } from 'src/entityes/dics/statusTicket.entity';
import { AuthModule } from '../auth/auth.module';
import {
  CategoryTicketController,
  DicsTicketController,
} from './controllers/dicsTicket.service';
import { OrgsController } from './controllers/organization.controller';
import { OtdelsController } from './controllers/otdels.controller';
import { PostsController } from './controllers/posts.controller';
import { DicsTicketService } from './services/dicsTicket.service';
import { OrgsService } from './services/organization.service';
import { OtdelsService } from './services/otdels.service';
import { PostsService } from './services/posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      Otdels,
      Employee,
      Posts,
      StatusTicket,
      CategoryTicket,
    ]),
    AuthModule,
  ],
  controllers: [
    OrgsController,
    OtdelsController,
    PostsController,
    DicsTicketController,
    CategoryTicketController,
  ],
  providers: [OrgsService, OtdelsService, PostsService, DicsTicketService],
})
export class DicsModule {}
