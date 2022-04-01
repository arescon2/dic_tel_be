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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IdAndUserIdDto, IdDto } from 'src/rootDto/idDto';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { AddRolesToUserDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { CreateAccauntDto, UpdateAccuntDto } from '../dto/accaunt.dto';
import { PersonService } from 'src/modules/priem/services/person.service';
import { OrgsService } from 'src/modules/dics/services/organization.service';

@ApiTags('Аккаунт')
@Controller('accaunt')
@UseGuards(JwtAuthGuard)
export class AccauntController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly orgService: OrgsService,
  ) {}

  // получение всех аккаунтов
  @Get()
  @UsePipes(new ValidationPipe())
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

  @Post()
  @UsePipes(new ValidationPipe())
  async createAcc(
    @Res() response: Response,
    @Body() body: CreateAccauntDto,
  ): Promise<any> {
    const hash = await this.authService.hashedPassword(body.password);

    const person = await this.personService.Find({ id: body.person });

    // создаем аккаунт админа
    await this.authService
      .createUser({
        login: body.login,
        email: body.email,
        password: hash,
        person: person,
      })
      .then((res) => {
        response.status(HttpStatus.OK).json({
          message: 'ok',
          data: {
            uid: res.uid,
            login: res.login,
            email: res.email,
          },
        });
      })
      .catch((error) => {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: 'error',
          data: error,
        });
      });
  }

  // To Do: Редактировать аккаунт
  @Put()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async updAcc(
    @Res() response: Response,
    @Query('id') id: number,
    @Body() body: UpdateAccuntDto,
  ): Promise<any> {
    this.authService
      .updUser({
        id: id,
        login: body.login,
        email: body.email,
        // organization: body.organization,
        roles: body.roles,
        isActive: body.isActive,
      })
      .then((res) => {
        response.status(HttpStatus.OK).json({
          message: 'ok',
          data: {
            id: res.id,
          },
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
