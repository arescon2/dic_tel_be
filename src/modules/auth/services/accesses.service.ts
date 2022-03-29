import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { AppCreateDto, AppUpdDto } from '../dto/apps.dto';
import { Accesses } from 'src/entityes/auth/accesses.entity';
import { IAccess } from '../interfaces/access.i';

@Injectable()
export class AccessesService {
  constructor(
    @InjectRepository(Accesses)
    private AcssRep: Repository<Accesses>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: string,
  ): Promise<[IAccess[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    const result = await this.AcssRep.createQueryBuilder('accessses')
      .take(take)
      .offset(page)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async createAccess(data: any): Promise<Accesses> {
    data = Object.assign(data, AppCreateDto);
    data.uid = uuidv4();

    return this.AcssRep.save(data);
  }

  async updAccess(id: number, inData: AppUpdDto): Promise<any> {
    let data = await this.AcssRep.findOne({ where: { id: id } });

    data = Object.assign(data, inData);

    return this.AcssRep.save(data);
  }

  async deleteAccess(id: number): Promise<any> {
    return await this.AcssRep.delete(id);
  }

  async init(): Promise<any> {
    const data = [
      {
        name: 'Пользователи',
        url: '/person',
      },
      {
        name: 'Пользователи',
        url: '/person',
      },
      {
        name: 'Пользователи',
        url: '/person',
      },
    ];
    return 'ok';
  }
}
