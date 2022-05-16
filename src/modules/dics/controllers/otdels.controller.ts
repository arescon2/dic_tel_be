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
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { IdDto } from 'src/rootDto/idDto';
import { Roles } from 'src/modules/auth/roles.decorator';
import { OtdelsService } from '../services/otdels.service';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { OtdelsCreateDto, OtdelsUpdateDto } from '../dto/otdels.dto';
import { IRoles } from 'src/modules/auth/interfaces/roles.i';
import { isDevelop } from 'src/libs';

@ApiTags('Справочники | Отделы организации')
@Controller('otdels')
@UseGuards(JwtAuthGuard)
export class OtdelsController {
  constructor(private readonly otdelsServices: OtdelsService) {}

  @Get()
  async GetOtdels(
    @Res() res: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const _filters = filters ? JSON.parse(filters) : {};

    const roles: IRoles[] = request.user['roles'];
    const develop = isDevelop(roles);

    if (!develop)
      _filters['organization'] = request.user['person'].organization.id;

    const arrayData = await this.otdelsServices.findPagination(
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

  @Post()
  @ApiCreatedResponse({ type: Otdels })
  @UsePipes(new ValidationPipe())
  async createOrg(
    @Body() data: OtdelsCreateDto,
    @Req() request: Request,
  ): Promise<any> {
    const roles: IRoles[] = request.user['roles'];

    const develop = isDevelop(roles);

    if (!develop) data.organization = request.user['person'].organization.id;

    return await this.otdelsServices.createOtdel(data);
  }

  @Put()
  @ApiCreatedResponse({ type: Otdels })
  @UsePipes(new ValidationPipe())
  @Roles('ADMIN')
  async updOrg(@Body() data: OtdelsUpdateDto): Promise<any> {
    return await this.otdelsServices.updOtdel(data);
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  @Roles('ADMIN')
  async deleteFile(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.otdelsServices
      .deleteOtdel(query.id)
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
