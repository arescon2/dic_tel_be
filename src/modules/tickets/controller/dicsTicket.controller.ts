import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
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
import { StatusTicket } from 'src/entityes/tickets/statusTicket.entity';
import { IdDto } from 'src/rootDto/idDto';
import { CategoryTicket } from 'src/entityes/tickets/categoryTicket.entity';
import { TypeTicket } from 'src/entityes/tickets/typeTicket.entity';
import { Roles } from 'src/modules/auth/roles.decorator';
import { StatusTicketUpdDto } from '../dto/status.dto';

@ApiTags('Тикеты | Справочник | Статусы')
@Controller('dicstickets')
@UseGuards(JwtAuthGuard)
export class DicsTicketController {
  constructor(private readonly dicsTicketServ: DicsTicketService) {}

  // --------------------------------------------- СТАТУСЫ
  @Get('status')
  async GetStatus(@Res() res: Response): Promise<any> {
    const arrayData = await this.dicsTicketServ.statusFind();

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

  @Put('status')
  @ApiCreatedResponse({ type: StatusTicket })
  @UsePipes(new ValidationPipe())
  async updStatus(
    @Query('id') id: number,
    @Body() data: StatusTicketUpdDto,
  ): Promise<any> {
    return await this.dicsTicketServ.updStatus(id, data);
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
  async GetCategory(@Res() res: Response): Promise<any> {
    const arrayData = await this.dicsTicketServ.categoryFind();

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
    return await this.dicsTicketServ.createCategory(data);
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

@ApiTags('Тикеты | Справочник | Типы')
@Controller('dicstickets')
@UseGuards(JwtAuthGuard)
export class TypesTicketController {
  constructor(private readonly dicsTicketServ: DicsTicketService) {}

  // --------------------------------------------- КАТЕГОРИИ
  @Get('type')
  async GetTypes(@Res() res: Response): Promise<any> {
    const arrayData = await this.dicsTicketServ.typeFind();

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayData[0],
      count: arrayData[1],
    });
  }

  @Post('type')
  @ApiCreatedResponse({ type: TypeTicket })
  @UsePipes(new ValidationPipe())
  async createType(
    @Body() data: NameDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.dicsTicketServ.createType(data);
  }

  @Delete('type')
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteCategory(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.dicsTicketServ
      .deleteType(query.id)
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
