import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { IError } from 'src/interfaces/error.i';
import { Files } from 'src/entityes/core/files.entity';
import { IFileFront, IFiles } from '../interfaces/files.i';
import { TAKE } from 'src/constants';

interface IErrorAndData {
  data: any;
  error: IError;
}

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files)
    private FilesRep: Repository<Files>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: string,
  ): Promise<[IFiles[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) {
      ordering[orderby] = order;
    }

    const result = await this.FilesRep.createQueryBuilder('files')
      .take(take)
      .offset(page)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async SaveFile(uploadedFile: IFileFront): Promise<any> {
    const file = this.FilesRep.create({
      uid: uuidv4(),
      dateCreate: new Date(Date.now()),
      name: uploadedFile.filename,
      path: uploadedFile.path,
      originalname: uploadedFile.originalname,
      type: uploadedFile.mimetype,
      size: uploadedFile.size,
    });
    const result = await this.FilesRep.save(file);
    return result;
  }

  async deleteFile(id: number): Promise<any> {
    // удаляем с файловой системы
    return await this.FilesRep.delete(id);
  }
}
