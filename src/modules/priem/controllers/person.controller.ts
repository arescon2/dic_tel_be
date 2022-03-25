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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Person } from 'src/entityes/priem/person.entity';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { IdDto } from 'src/rootDto/idDto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { PersonCreateDto, PersonUpdDto } from '../dto/person.dto';
import { PersonService } from '../services/person.service';

@ApiTags('Пользователи')
@Controller('person')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class PersonController {
  constructor(private readonly personServ: PersonService) {}

  @Get()
  @ApiCreatedResponse({ isArray: true, type: Person })
  async GetAll(
    @Res() res: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.personServ.findPagination(
      page,
      limit,
      orderby,
      order,
      filters,
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayAccaunt[0],
      count: arrayAccaunt[1],
    });
  }

  @Post()
  @Roles('ADMIN')
  @ApiCreatedResponse({ type: Person })
  @UsePipes(new ValidationPipe())
  async createPerson(@Body() data: PersonCreateDto): Promise<any> {
    return this.personServ.createPerson(data);
  }

  @Put()
  @Roles('ADMIN')
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
