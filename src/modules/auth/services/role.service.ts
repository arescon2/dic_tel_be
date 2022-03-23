import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { TAKE } from 'src/constants';

import { Roles } from 'src/entityes/auth/roles.entity';
import { IRoles } from '../interfaces/roles.i';
import { RoleCreateDto, RoleUpdDto } from '../dto/role';

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
    filters?: string,
  ): Promise<[IRoles[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) ordering[orderby] = order;

    const result = await this.RoleRep.createQueryBuilder('role')
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

  async updRole(inData: any): Promise<any> {
    let data = await this.RoleRep.findOne({ where: { id: inData.id } });

    delete inData.id;

    data = Object.assign(data, inData);

    data.dateUpd = new Date(Date.now());

    return this.RoleRep.save(data);
  }

  async deleteRole(id: number): Promise<any> {
    return await this.RoleRep.delete(id);
  }
}
