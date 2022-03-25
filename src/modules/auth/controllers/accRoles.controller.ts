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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IdAndUserIdDto, IdDto } from 'src/rootDto/idDto';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { AddRolesToUserDto } from '../dto/auth';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Аккаунт')
@Controller('accaunt')
@UseGuards(JwtAuthGuard)
export class AccauntController {
  constructor(private readonly authService: AuthService ) {}

  // получение всех аккаунтов
  @Get()
  async getAccs(
    @Res() res: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.authService.findPagination(
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

  // To Do: сделать DTO
  @Post()
  @ApiQuery({ type: IdAndUserIdDto })
  @UsePipes(new ValidationPipe())
  async createAcc(): Promise<any> {
    // создаем Персона для админа
    const hash = await this.authService.hashedPassword('admin');

    // создаем аккаунт админа
    await this.authService.createUser({
      login: 'admin',
      password: hash,
      email: 'admin@admin.com',
      person: adminPerson,
      roles: [role],
    });
    return 'ok';
  }

  // добавление роли для аккаунта
  @Post('/roles')
  async addRolesToUser(@Body() data: AddRolesToUserDto): Promise<any> {
    const result = await this.authService.addRolesToUser(data);
    return result;
  }

  // удаление роли аккаунта
  @Delete('/roles')
  @ApiQuery({ type: IdAndUserIdDto })
  @UsePipes(new ValidationPipe())
  async deleteRole(
    @Query() query: IdAndUserIdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.authService
      .delRoleToUser(query.id, query.userid)
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
