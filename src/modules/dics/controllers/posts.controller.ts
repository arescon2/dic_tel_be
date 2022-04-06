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
import { IdDto } from 'src/rootDto/idDto';
import { Roles } from 'src/modules/auth/roles.decorator';
import { OtdelsService } from '../services/otdels.service';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { OtdelsCreateDto, OtdelsUpdateDto } from '../dto/otdels.dto';
import { IRoles } from 'src/modules/auth/interfaces/roles.i';
import { isDevelop } from 'src/libs';
import { PostsService } from '../services/posts.service';
import { Posts } from 'src/entityes/dics/posts.entity';

@ApiTags('Справочники | Должности')
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postServ: PostsService) {}

  @Get()
  async GetOtdels(
    @Res() res: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const _filters = filters ? JSON.parse(filters) : {};

    const arrayData = await this.postServ.findPagination(
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
  @ApiCreatedResponse({ type: Posts })
  @UsePipes(new ValidationPipe())
  async createOrg(
    @Body() data: NameDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.postServ.createOtdel(data);
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  @Roles('ADMIN')
  async deletePost(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.postServ
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
