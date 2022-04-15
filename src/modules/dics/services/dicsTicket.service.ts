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
import { StatusTicket } from 'src/entityes/dics/statusTicket.entity';
import { CategoryTicket } from 'src/entityes/dics/categoryTicket.entity';

@Injectable()
export class DicsTicketService {
  constructor(
    @InjectRepository(StatusTicket)
    private statusRep: Repository<StatusTicket>,
    @InjectRepository(CategoryTicket)
    private categoryRep: Repository<CategoryTicket>,
  ) {}

  // --------------------------------------------- СТАТУСЫ
  async statusFind(
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
        andWhereVar += 'status.id = :id ';
        andWhereObj['id'] = filters.id;
      }
      if (filters.name) {
        andWhereVar += 'LOWER(status.name) like :name';
        andWhereObj['name'] = `%${_.toLower(filters.name)}%`;
      }
    }

    const result = await this.statusRep
      .createQueryBuilder('status')
      .where(andWhereVar, andWhereObj)
      .getManyAndCount();

    return result;
  }

  async createStatus(data: any): Promise<any> {
    const newField = this.statusRep.create(data);

    return this.statusRep.save(newField);
  }

  async deleteStatus(id: number): Promise<any> {
    return await this.statusRep.delete(id);
  }
  // --------------------------------------------- КАТЕГОРИИ

  async categoryFind(
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
        andWhereVar += 'categ.id = :id ';
        andWhereObj['id'] = filters.id;
      }
      if (filters.name) {
        andWhereVar += 'LOWER(categ.name) like :name';
        andWhereObj['name'] = `%${_.toLower(filters.name)}%`;
      }
    }

    const result = await this.categoryRep
      .createQueryBuilder('categ')
      .where(andWhereVar, andWhereObj)
      .getManyAndCount();

    return result;
  }

  async createCategory(data: any): Promise<any> {
    const newField = this.categoryRep.create(data);

    return this.categoryRep.save(newField);
  }

  async deleteCategory(id: number): Promise<any> {
    return await this.categoryRep.delete(id);
  }
}
