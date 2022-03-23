import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import moment from 'moment';
import { Person } from 'src/entityes/priem/person.entity';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { PersonCreateDto, PersonGetDto, PersonUpdDto } from '../dto/person.dto';
import { PersonService } from '../services/person.service';

@ApiTags('Прием')
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
  @ApiCreatedResponse({ type: Person })
  @UsePipes(new ValidationPipe())
  async createPerson(@Body() data: PersonCreateDto): Promise<any> {
    return this.personServ.createPerson(data);
  }

  @Put()
  @UsePipes(new ValidationPipe())
  async updPerson(
    @Body() data: PersonUpdDto,
    @Res() res: Response,
  ): Promise<any> {
    return this.personServ.updPerson(data);
  }
}
