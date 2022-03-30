import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Req,
} from '@nestjs/common';

import _ from 'lodash';

import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Person } from 'src/entityes/priem/person.entity';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { IdDto } from 'src/rootDto/idDto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { PersonCreateDto, PersonUpdDto } from '../dto/person.dto';
import { PersonService } from '../services/person.service';
import { OrgsService } from 'src/modules/dics/services/organization.service';

@ApiTags('Пользователи')
@Controller('person')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PersonController {
  constructor(
    private readonly personServ: PersonService,
    private readonly orgService: OrgsService,
  ) {}

  @Get()
  @ApiCreatedResponse({ isArray: true, type: Person })
  async GetAll(
    @Res() response: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const _filters = filters ? JSON.parse(filters) : {};

    if (!request.user['developer']) {
      _filters.organization = request.user['person'].organization.id;
    }

    const arrayAccaunt = await this.personServ.findPagination(
      page,
      limit,
      orderby,
      order,
      _filters,
    );

    response.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayAccaunt[0],
      count: arrayAccaunt[1],
    });
  }

  @Post()
  @ApiCreatedResponse({ type: Person })
  @UsePipes(new ValidationPipe())
  async createPerson(
    @Req() request: Request,
    @Body() body: PersonCreateDto | any,
  ): Promise<any> {
    if (!request.user['developer']) {
      body.organization = request.user['person'].organization.id;
    }

    return this.personServ.createPerson(body);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updPerson(
    @Body() data: PersonUpdDto,
    @Res() res: Response,
  ): Promise<any> {
    const person = await this.personServ.updPerson(data);

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: person,
    });
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles('ADMIN')
  async deleteFile(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    if (query.id === 1) {
      response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error',
        data: 'Данного пользователя удалить нельзя!',
      });
    } else {
      await this.personServ
        .DelOne(query.id)
        .then((res) => {
          response.status(HttpStatus.OK).json({
            message: 'ok',
            data: res,
          });
        })
        .catch((error) => {
          response.status(HttpStatus.BAD_REQUEST).json({
            message: 'error',
            data: error,
          });
        });
    }
  }
}
