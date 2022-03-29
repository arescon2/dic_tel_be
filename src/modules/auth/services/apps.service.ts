import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { Roles } from 'src/entityes/auth/roles.entity';
import { IRoles } from '../interfaces/roles.i';
import { Apps } from 'src/entityes/auth/apps.entity';
import { IApps } from '../interfaces/apps';
import { AppCreateDto, AppUpdDto } from '../dto/apps.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(Apps)
    private AppsRep: Repository<Apps>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: string,
  ): Promise<[IApps[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    const result = await this.AppsRep.createQueryBuilder('role')
      .take(take)
      .offset(page)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async createApp(data: any): Promise<Roles> {
    data = Object.assign(data, AppCreateDto);
    data.uid = uuidv4();

    return this.AppsRep.save(data);
  }

  async updApp(id: number, inData: AppUpdDto): Promise<any> {
    let data = await this.AppsRep.findOne({ where: { id: id } });

    data = Object.assign(data, inData);

    return this.AppsRep.save(data);
  }

  async deleteApp(id: number): Promise<any> {
    return await this.AppsRep.delete(id);
  }
}
