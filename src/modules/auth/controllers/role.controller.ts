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
import { DeleteDto } from 'src/rootDto/root.dto';
import { IdDto } from 'src/rootDto/idDto';

@ApiTags('Роли')
@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async GetData(
    @Res() res: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.roleService.findPagination(
      page,
      limit,
      orderby,
      order,
      filters ? JSON.parse(filters) : {},
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayAccaunt[0],
      count: arrayAccaunt[1],
    });
  }

  @Post()
  @ApiCreatedResponse({ type: Roles })
  @UsePipes(new ValidationPipe())
  async SaveOne(@Body() data: RoleCreateDto): Promise<any> {
    return this.roleService.createRole(data);
  }

  @Put()
  @ApiCreatedResponse({ type: Roles })
  @UsePipes(new ValidationPipe())
  async UpdOne(@Query() query: IdDto, @Body() data: RoleUpdDto): Promise<any> {
    return this.roleService.updRole(query.id, data);
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteRole(
    @Query('id', new ParseIntPipe()) id: number,
    @Res() response: Response,
  ): Promise<any> {
    if (id === 1) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error',
        data: 'Роль Администратора не может быть удален',
      });
    }
    await this.roleService
      .deleteRole(id)
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
