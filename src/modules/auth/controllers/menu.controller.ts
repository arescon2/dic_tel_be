import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import _ from 'lodash';
import { Response, Request } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { IAccaunt } from 'src/modules/auth/interfaces/accaunt.i';
import { IError } from 'src/interfaces/error.i';

import { AuthService } from '../services/auth.service';
import { CreateAccauntDto, LoginPassDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PersonService } from '../../priem/services/person.service';
import { Accaunt } from 'src/entityes/auth/accaunt.entity';
import { RoleService } from '../services/role.service';
import { AccessesService } from '../services/accesses.service';

@ApiTags('Меню')
@Controller('menu')
export class MenuController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly roleService: RoleService,
    private readonly AccessService: AccessesService,
  ) {}

  @Get()
  async getMenu() {
    const settings = [
      
    ]
    return 'ok';
  }
}
