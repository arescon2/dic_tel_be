import { Injectable } from '@nestjs/common';

import _ from 'lodash';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TAKE } from 'src/constants';

import { StatusTicket } from 'src/entityes/tickets/statusTicket.entity';
import { CategoryTicket } from 'src/entityes/tickets/categoryTicket.entity';
import { TypeTicket } from 'src/entityes/tickets/typeTicket.entity';

@Injectable()
export class DicsTicketService {
  constructor(
    @InjectRepository(StatusTicket)
    private statusRep: Repository<StatusTicket>,
    @InjectRepository(CategoryTicket)
    private categoryRep: Repository<CategoryTicket>,
    @InjectRepository(TypeTicket)
    private typeRep: Repository<TypeTicket>,
  ) {}

  // --------------------------------------------- СТАТУСЫ
  async statusFind(): Promise<[StatusTicket[], number]> {
    const result = await this.statusRep
      .createQueryBuilder('status')
      .orderBy('id')
      .getManyAndCount();

    return result;
  }

  async createStatus(data: any): Promise<any> {
    const newField = this.statusRep.create(data);

    return this.statusRep.save(newField);
  }

  async updStatus(id: number, inData: any): Promise<any> {
    let data = await this.statusRep.findOne({ where: { id: id } });

    if (!data) return this.statusRep.findOneOrFail({ where: { id: id } });

    data = Object.assign(data, inData);

    return this.statusRep.save(data);
  }

  async deleteStatus(id: number): Promise<any> {
    return await this.statusRep.delete(id);
  }

  // --------------------------------------------- КАТЕГОРИИ

  async categoryFind(): Promise<[CategoryTicket[], number]> {
    const result = await this.categoryRep
      .createQueryBuilder('categ')
      .orderBy('id')
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

  // --------------------------------------------- Типы

  async typeFind(): Promise<[TypeTicket[], number]> {
    const result = await this.typeRep
      .createQueryBuilder('type')
      .orderBy('id')
      .getManyAndCount();

    return result;
  }

  async createType(data: any): Promise<any> {
    const newField = this.typeRep.create(data);

    return this.typeRep.save(newField);
  }

  async deleteType(id: number): Promise<any> {
    return await this.typeRep.delete(id);
  }
}
