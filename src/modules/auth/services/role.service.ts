import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { Roles } from 'src/entityes/auth/roles.entity';
import { IRoles } from '../interfaces/roles.i';
import { RoleCreateDto, RoleUpdDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private RoleRep: Repository<Roles>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: IRoles,
  ): Promise<[IRoles[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.id) {
        andWhereVar += 'role.id = :id';
        andWhereObj['id'] = filters.id;
      }
    }

    const result = await this.RoleRep.createQueryBuilder('role')
      .where(andWhereVar, andWhereObj)
      .take(take)
      .offset(page)
      .orderBy(ordering)
      .getManyAndCount();

    return result;
  }

  async createRole(data: any): Promise<Roles> {
    data = Object.assign(data, RoleCreateDto);
    data.isActive = true;
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());

    return this.RoleRep.save(data);
  }

  async updRole(id: number, inData: RoleUpdDto): Promise<any> {
    let data = await this.RoleRep.findOne({ where: { id: id } });

    data = Object.assign(data, inData);

    data.dateUpd = new Date(Date.now());

    return this.RoleRep.save(data);
  }

  async deleteRole(id: number): Promise<any> {
    return await this.RoleRep.delete(id);
  }
}
