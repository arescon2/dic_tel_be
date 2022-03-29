import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  UseInterceptors,
  Query,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import _ from 'lodash';
import { Response } from 'express';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../jwt-auth.guard';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { RoleService } from '../services/role.service';
import { Roles } from 'src/entityes/auth/roles.entity';
import { RoleCreateDto, RoleUpdDto } from '../dto/role.dto';
import { IdDto } from 'src/rootDto/idDto';
import { AppsService } from '../services/apps.service';
import { AppCreateDto } from '../dto/apps.dto';
import { Apps } from 'src/entityes/auth/apps.entity';

@ApiTags('Приложения')
@Controller('application')
@UseGuards(JwtAuthGuard)
export class AppsController {
  constructor(private readonly appService: AppsService) {}

  @Get()
  async getApps(
    @Res() res: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.appService.findPagination(
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
  @ApiCreatedResponse({ type: Apps })
  @UsePipes(new ValidationPipe())
  async SaveOne(@Body() data: AppCreateDto): Promise<any> {
    return this.appService.createApp(data);
  }

  @Put()
  @ApiQuery({ type: IdDto })
  @ApiCreatedResponse({ type: Roles })
  @UsePipes(new ValidationPipe())
  async UpdOne(
    @Query('id', new ParseIntPipe()) id: number,
    @Body() data: RoleUpdDto,
  ): Promise<any> {
    return this.appService.updApp(id, data);
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteRole(
    @Query('id', new ParseIntPipe()) id: number,
    @Res() response: Response,
  ): Promise<any> {
    await this.appService
      .deleteApp(id)
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
