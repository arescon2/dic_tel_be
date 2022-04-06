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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { DicAppService } from './dicApp.service';
import { IRoles } from '../auth/interfaces/roles.i';
import { isDevelop } from 'src/libs';

@ApiTags('Приложение | Телефонный справочник')
@Controller('dicapp')
@UseGuards(JwtAuthGuard)
export class DicApssController {
  constructor(private readonly dicAppService: DicAppService) {}

  @Get()
  async getList(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    // получем список
    const roles: IRoles[] = request.user['roles'];
    const develop = isDevelop(roles);

    const data = await this.dicAppService.getListRoot(
      develop,
      request.user['person'].organization,
    );
    response.status(HttpStatus.OK).send({
      message: 'ok',
      data: data,
    });

    return '';
  }
}
