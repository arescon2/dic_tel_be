import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import _ from 'lodash';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { IOtdels } from '../interfaces/otdels.i';

@Injectable()
export class OtdelsService {
  constructor(
    @InjectRepository(Otdels)
    private OtdelsRep: Repository<Otdels>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: IOtdels,
  ): Promise<[Otdels[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.id) {
        andWhereVar += ' otdels.id = :id ';
        andWhereObj['id'] = filters.id;
      }
      if (filters.name) {
        andWhereVar +=
          ' LOWER(otdels.name) like :name OR LOWER(otdels.short) like :name ';
        andWhereObj['name'] = `%${_.toLower(filters.name)}%`;
      }
      if (filters.organization) {
        andWhereVar += ' orgs.id = :organization ';
        andWhereObj['organization'] = filters.organization;
      }
    }

    const result = await this.OtdelsRep.createQueryBuilder('otdels')
      .leftJoinAndSelect('otdels.organization', 'orgs')
      .where(andWhereVar, andWhereObj)
      .select(['otdels.id', 'otdels.name', 'orgs.id', 'orgs.name'])
      .take(take)
      .skip(page * take)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async Find(id: number): Promise<Otdels> {
    return this.OtdelsRep.findOne({ id: id });
  }

  async createOtdel(data: any): Promise<any> {
    const newField = this.OtdelsRep.create(data);

    return this.OtdelsRep.save(newField);
  }

  async updOtdel(inData: any): Promise<any> {
    let data = await this.OtdelsRep.findOne({ where: { id: inData.id } });

    delete inData.id;

    inData = _.omitBy(inData, _.isNil);

    data = Object.assign(data, inData);

    return this.OtdelsRep.save(data);
  }

  async deleteOtdel(id: number): Promise<any> {
    return await this.OtdelsRep.delete(id);
  }
}
