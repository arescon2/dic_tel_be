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
} from '@nestjs/common';
import _ from 'lodash';
import { Response } from 'express';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { OrgsService } from '../services/organization.service';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { Organization } from 'src/entityes/dics/organizations.entity';
import {
  OrganizationCreateDto,
  OrganizationUpdateDto,
} from '../dto/organizations.dto';
import { IdDto } from 'src/rootDto/idDto';
import { Roles } from 'src/modules/auth/roles.decorator';

@ApiTags('Справочники | Отделы организации')
@Controller('otdel')
@UseGuards(JwtAuthGuard)
export class OrgsController {
  constructor(private readonly orgsService: OrgsService) {}

  @Get()
  async getOrgs(
    @Res() res: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.orgsService.findPagination(
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
  @ApiCreatedResponse({ type: Organization })
  @UsePipes(new ValidationPipe())
  async createOrg(@Body() data: OrganizationCreateDto): Promise<any> {
    return await this.orgsService.createOrg(data);
  }

  @Put()
  @ApiCreatedResponse({ type: Organization })
  @UsePipes(new ValidationPipe())
  @Roles('ADMIN')
  async updOrg(@Body() data: OrganizationUpdateDto): Promise<any> {
    console.log(data);
    return await this.orgsService.updOrg(data);
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  @Roles('ADMIN')
  async deleteFile(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.orgsService
      .deleteOrg(query.id)
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
