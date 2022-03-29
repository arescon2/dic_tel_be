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
import { IOrganization } from '../interfaces/organizations.i';

@Injectable()
export class OrgsService {
  constructor(
    @InjectRepository(Organization)
    private OrgsRep: Repository<Organization>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: IOrganization,
  ): Promise<[IOrganization[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.id) {
        andWhereVar += 'organization.id = :id';
        andWhereObj['id'] = filters.id;
      }
      if (filters.name) {
        andWhereVar += 'organization.name like :name';
        andWhereObj['name'] = `%${filters.name}%`;
      }
    }

    const result = await this.OrgsRep.createQueryBuilder('organization')
      .where(andWhereVar, andWhereObj)
      .take(take)
      .offset(page * take)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async Find(id: number): Promise<IOrganization> {
    return this.OrgsRep.findOne({ id: id });
  }

  async createOrg(data: any): Promise<any> {
    data.isActive = true;
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());

    if (data['parent']) {
      const parent = await this.OrgsRep.findOne(data['parent']);
      if (!parent) throw new NotFoundException('Родитель не найден');
    }

    const field = await this.OrgsRep.findOne({ where: { inn: data.inn } });

    if (field)
      throw new ConflictException('Организация с таким ИНН уже существует');

    const newField = this.OrgsRep.create(data);

    return this.OrgsRep.save(newField);
  }

  async updOrg(inData: any): Promise<any> {
    let data = await this.OrgsRep.findOne({ where: { id: inData.id } });

    delete inData.id;

    inData = _.omitBy(inData, _.isNil);

    data = Object.assign(data, inData);

    data.dateUpd = new Date(Date.now());

    return this.OrgsRep.save(data);
  }

  async deleteOrg(id: number): Promise<any> {
    return await this.OrgsRep.delete(id);
  }
}
