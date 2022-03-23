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
import { AccauntController } from './controllers/accRoles.controller';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accaunt, Person, Roles]),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController, AccauntController, RoleController],
  providers: [AuthService, PersonService, RoleService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
