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
import { IRoles } from 'src/modules/auth/interfaces/roles.i';
import { isDevelop } from 'src/libs';
import { IssuesService } from '../services/issues.service';
import { Issue } from 'src/entityes/tickets/issue.entity';
import { IssueCreateDto, IssueUpdDto } from '../dto/issue.dto';

@ApiTags('Тикеты | Обращения')
@Controller('issue')
@UseGuards(JwtAuthGuard)
export class IssueController {
  constructor(private readonly issuesService: IssuesService) {}

  @Get('all')
  @ApiCreatedResponse({ type: [Issue] })
  async GetAllIssues(
    @Res() res: Response,
    @Req() request: Request,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;
    // получем список
    const roles: IRoles[] = request.user['roles'];
    const develop = isDevelop(roles);

    const data = await this.issuesService.findPagination(
      develop,
      request.user['person'],
      {
        page,
        limit,
        orderby,
        order,
      },
      filters ? JSON.parse(filters) : {},
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: data[0],
      count: data[1],
    });
  }

  @Get()
  @ApiCreatedResponse({ type: [Issue] })
  async GetOneIssue(
    @Res() res: Response,
    @Query('id') id: number,
  ): Promise<any> {
    const data = await this.issuesService.findOne(id);

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: data,
    });
  }

  @Post()
  @ApiCreatedResponse({ type: Issue })
  @UsePipes(new ValidationPipe())
  async create(
    @Req() request: Request,
    @Body() body: IssueCreateDto,
  ): Promise<any> {
    const result = await this.issuesService.createIssue(
      body,
      request.user['person'],
    );
    return result;
  }

  // Put
  @Put()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async updIssue(
    @Query('id') id: number,
    @Body() data: IssueUpdDto,
    @Res() res: Response,
  ): Promise<any> {
    const employee = await this.issuesService.updateIssue(
      _.toInteger(id),
      data,
    );

    res.status(HttpStatus.OK).send({
      message: 'ok',
      data: employee,
    });
  }
}
