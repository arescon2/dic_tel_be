import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

import { Person } from 'src/entityes/priem/person.entity';
import { PersonCreateDto, PersonGetDto } from '../dto/person.dto';
import moment from 'moment';
import { IPerson } from '../interfaces/person.i';
import { TAKE } from 'src/constants';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private PersonRep: Repository<Person>,
  ) {}

  async findPagination(
    page?: number,
    take?: number,
    orderby?: string,
    order?: number,
    filters?: IPerson,
  ): Promise<[IPerson[], number]> {
    take = take || TAKE;
    page = page - 1 || 0;

    const ordering = {};

    if (orderby) {
      ordering[orderby] = order;
    }

    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.id) {
        andWhereVar += 'person.id = :id ';
        andWhereObj['id'] = filters.id;
      }
      if (filters.organization) {
        andWhereVar += 'organization.id = :orgid ';
        andWhereObj['orgid'] = filters.organization;
      }
    }

    const result = await this.PersonRep.createQueryBuilder('person')
      .leftJoinAndSelect('person.organization', 'organization')
      .where(andWhereVar, andWhereObj)
      .take(take)
      .skip(page * take)
      .orderBy('person.id', 'ASC')
      .getManyAndCount();

    return result;
  }

  async Find(data: any): Promise<Person> {
    data.isActive = data.isActive || true;

    return this.PersonRep.findOne(data);
  }

  async createPerson(data: any): Promise<Person> {
    data = Object.assign(data, PersonCreateDto);
    data.isActive = true;
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());

    return this.PersonRep.save(data);
  }

  async updPerson(inData: any): Promise<Person> {
    let data = await this.PersonRep.findOne({ where: { id: inData.id } });
    data = Object.assign(data, inData);

    data.dateUpd = new Date(Date.now());

    if (data.dateBirth) data.dateBirth = data.dateBirth;

    return this.PersonRep.save(data);
  }

  async createAdmin(org: IOrganization): Promise<Person> {
    const admin = this.PersonRep.create({
      fam: 'admin',
      im: 'admin',
      organization: org,
      dateBirth: new Date(Date.now()),
      uid: uuidv4(),
      dateCreate: new Date(Date.now()),
    });

    return await this.PersonRep.save(admin);
  }

  async DelOne(id: number): Promise<any> {
    return await this.PersonRep.delete(id);
  }
}
