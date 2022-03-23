import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from '../services/files.service';

import { FileCreateDto } from '../dto/file';
import { Files } from 'src/entityes/core/files.entity';
import { PaginFilterOrderClass } from 'src/rootDto/dtos';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { Response } from 'express';
import { IdDto } from 'src/rootDto/idDto';

@ApiTags('Файлы')
@Controller('file')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class FilesController {
  constructor(private readonly filesServ: FilesService) {}

  @Get()
  @ApiCreatedResponse({ isArray: true, type: Files })
  async GetAll(
    @Res() response: Response,
    @Query() query: PaginFilterOrderClass,
  ): Promise<any> {
    const { page, limit, orderby, order, filters } = query;

    const arrayAccaunt = await this.filesServ.findPagination(
      page,
      limit,
      orderby,
      order,
      filters,
    );

    response.status(HttpStatus.OK).send({
      message: 'ok',
      data: arrayAccaunt[0],
      count: arrayAccaunt[1],
    });
  }

  @Post()
  @ApiBody({ type: FileCreateDto })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async saveFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
    const result = await this.filesServ.SaveFile(file);
    return result;
  }

  @Post('report')
  @ApiBody({ type: FileCreateDto })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/reports',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async saveReportFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const result = await this.filesServ.SaveFile(file);
    return result;
  }

  @Delete()
  @ApiQuery({ type: IdDto })
  @UsePipes(new ValidationPipe())
  async deleteFile(
    @Query() query: IdDto,
    @Res() response: Response,
  ): Promise<any> {
    await this.filesServ
      .deleteFile(query.id)
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
