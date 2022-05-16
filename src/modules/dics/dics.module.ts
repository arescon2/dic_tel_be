import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entityes/dics/employee.entity';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { Posts } from 'src/entityes/dics/posts.entity';
import { AuthModule } from '../auth/auth.module';

import { OrgsController } from './controllers/organization.controller';
import { OtdelsController } from './controllers/otdels.controller';
import { PostsController } from './controllers/posts.controller';
import { OrgsService } from './services/organization.service';
import { OtdelsService } from './services/otdels.service';
import { PostsService } from './services/posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, Otdels, Employee, Posts]),
    AuthModule,
  ],
  controllers: [OrgsController, OtdelsController, PostsController],
  providers: [OrgsService, OtdelsService, PostsService],
})
export class DicsModule {}
