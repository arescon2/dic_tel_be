import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import _ from 'lodash';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { NameDto, PaginFilterOrderClass } from 'src/rootDto/dtos';
import { DicsTicketService } from '../services/dicsTicket.service';
import { StatusTicket } from 'src/entityes/dics/statusTicket.entity';
import { IdDto } from 'src/rootDto/idDto';
import { CategoryTicket } from 'src/entityes/dics/categoryTicket.entity';

@ApiTags('Тикеты | Справочник | Статусы')
@Controller('dicstickets')
@UseGuards(JwtAuthGuard)
export class DicsTicketController {
  constructor(private readonly dicsTicketServ: DicsTicketService) {}

  // --------------------------------------------- СТАТУСЫ
  @Get('status')
  async GetStatus(
    @Res() res: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const _filters = filters ? JSON.parse(filters) : {};

    const arrayData = await this.dicsTicketServ.statusFind(
      page,
      limit,
      orderby,
      order,
      _filters,
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayData[0],
      count: arrayData[1],
    });
  }

  @Post('status')
  @ApiCreatedResponse({ type: StatusTicket })
  @UsePipes(new ValidationPipe())
  async createStatus(
    @Body() data: NameDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.dicsTicketServ.createStatus(data);
  }

  @Delete('status')
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteStatus(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.dicsTicketServ
      .deleteStatus(query.id)
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

@ApiTags('Тикеты | Справочник | Категории')
@Controller('dicstickets')
@UseGuards(JwtAuthGuard)
export class CategoryTicketController {
  constructor(private readonly dicsTicketServ: DicsTicketService) {}

  // --------------------------------------------- КАТЕГОРИИ
  @Get('category')
  async GetCategory(
    @Res() res: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const _filters = filters ? JSON.parse(filters) : {};

    const arrayData = await this.dicsTicketServ.categoryFind(
      page,
      limit,
      orderby,
      order,
      _filters,
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayData[0],
      count: arrayData[1],
    });
  }

  @Post('category')
  @ApiCreatedResponse({ type: CategoryTicket })
  @UsePipes(new ValidationPipe())
  async createCategory(
    @Body() data: NameDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.dicsTicketServ.createStatus(data);
  }

  @Delete('category')
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteCategory(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.dicsTicketServ
      .deleteCategory(query.id)
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
