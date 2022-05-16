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
import _, { toInteger } from 'lodash';
import { query, Request, Response } from 'express';
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { DicAppService } from './dicApp.service';
import { IRoles } from '../auth/interfaces/roles.i';
import { isDevelop } from 'src/libs';
import { Employee } from 'src/entityes/dics/employee.entity';
import { EmployeeCreateDto, EmployeeUpdateDto } from './dto/employee.dto';
import { IdDto } from 'src/rootDto/idDto';
import { Roles } from '../auth/roles.decorator';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';

@ApiTags('Приложение | Телефонный справочник')
@Controller('employes')
@UseGuards(JwtAuthGuard)
export class DicApssController {
  constructor(private readonly dicAppService: DicAppService) {}

  @Get()
  async getList(
    @Req() request: Request,
    @Res() response: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;
    // получем список
    const roles: IRoles[] = request.user['roles'];
    const develop = isDevelop(roles);

    const data = await this.dicAppService.getListRoot(
      develop,
      request.user['person'].organization,
      filters ? JSON.parse(filters) : {},
    );
    response.status(HttpStatus.OK).send({
      message: 'ok',
      data: data,
    });

    return '';
  }

  @Post()
  @ApiCreatedResponse({ type: Employee })
  @UsePipes(new ValidationPipe())
  async createEmployee(@Body() body: EmployeeCreateDto): Promise<any> {
    return this.dicAppService.createEmployee(body);
  }

  @Put()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async updEmployee(
    @Query('id') id: number,
    @Body() data: EmployeeUpdateDto,
    @Res() res: Response,
  ): Promise<any> {
    const employee = await this.dicAppService.updEmployee(
      _.toInteger(id),
      data,
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: employee,
    });
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteFile(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.dicAppService
      .DelOne(query.id)
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
