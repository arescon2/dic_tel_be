import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConstants } from './constants';

import { Accaunt } from 'src/entityes/auth/accaunt.entity';
import { Person } from 'src/entityes/priem/person.entity';
import { Roles } from 'src/entityes/auth/roles.entity';

import { PersonService } from '../priem/services/person.service';
import { AuthService } from './services/auth.service';
import { RoleService } from './services/role.service';

import { AuthController } from './controllers/auth.controller';
import { AccauntController } from './controllers/accaunt.controller';
import { RoleController } from './controllers/role.controller';
import { OrgsService } from '../dics/services/organization.service';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Apps } from 'src/entityes/auth/apps.entity';
import { AppsController } from './controllers/apps.controller';
import { AppsService } from './services/apps.service';
import { AccessesService } from './services/accesses.service';
import { Accesses } from 'src/entityes/auth/accesses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Accaunt,
      Person,
      Roles,
      Organization,
      Apps,
      Accesses,
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [
    AuthController,
    AccauntController,
    RoleController,
    AppsController,
  ],
  providers: [
    AuthService,
    PersonService,
    RoleService,
    OrgsService,
    AppsService,
    AccessesService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
