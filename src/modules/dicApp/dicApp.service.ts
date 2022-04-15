import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entityes/dics/employee.entity';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Repository } from 'typeorm';
import { IOrganization } from '../dics/interfaces/organizations.i';

import { v4 as uuidv4 } from 'uuid';

import _ from 'lodash';

@Injectable()
export class DicAppService {
  constructor(
    @InjectRepository(Organization)
    private OrgsRep: Repository<Organization>,
    @InjectRepository(Employee)
    private EmployeeRep: Repository<Employee>,
  ) {}

  async getListRoot(
    dev: boolean,
    userOrg?: IOrganization,
    filters?: any,
  ): Promise<any> {
    let andWhereVar = '';
    const andWhereObj = {};

    if (filters) {
      if (filters.myorg) {
        andWhereVar += ' orgs.id = :id ';
        andWhereObj['id'] = userOrg.id;
      }

      if (filters.fio) {
        const d = filters.fio.split(' ');

        const [fam, im, otch] = d;

        fam
          ? (andWhereVar +=
              (andWhereVar.length > 1 ? 'AND' : '') +
              ' LOWER(employee.fam) like :fam ')
          : null;
        fam ? (andWhereObj['fam'] = `%${_.toLower(fam)}%`) : null;

        im
          ? (andWhereVar +=
              (andWhereVar.length > 1 ? 'AND' : '') +
              ' LOWER(employee.im) like :im ')
          : null;
        im ? (andWhereObj['im'] = `%${_.toLower(im)}%`) : null;

        otch
          ? (andWhereVar +=
              (andWhereVar.length > 1 ? 'AND' : '') +
              ' LOWER(employee.otch) like :otch ')
          : null;
        otch ? (andWhereObj['otch'] = `%${_.toLower(otch)}%`) : null;
      }

      if (filters.organization) {
        andWhereVar +=
          (andWhereVar.length > 1 ? 'AND' : '') +
          ' (LOWER(orgs.name) like :organization OR LOWER(orgs.short) like :organization) ';
        andWhereObj['organization'] = `%${_.toLower(filters.organization)}%`;
      }

      if (filters.position) {
        andWhereVar +=
          (andWhereVar.length > 1 ? 'AND' : '') + ' post.id = :position ';
        andWhereObj['position'] = filters.position;
      }
    }

    const data = await this.OrgsRep.createQueryBuilder('orgs')
      .leftJoinAndSelect('orgs.otdels', 'otdels')
      .leftJoinAndSelect('otdels.fields', 'employee')
      .leftJoinAndSelect('employee.position', 'post')
      .select(['orgs', 'otdels.id', 'otdels.name', 'employee', 'post'])
      .where(andWhereVar, andWhereObj)
      .getManyAndCount();

    return data;
  }

  async createEmployee(data: any): Promise<any> {
    data.isActive = true;
    data.uid = uuidv4();
    data.dateCreate = new Date(Date.now());
    data = _.omitBy(data, _.isNil);
    const newEmployee = this.EmployeeRep.create(data);
    return this.EmployeeRep.save(newEmployee);
  }

  async updEmployee(id: number, inData: any): Promise<Employee> {
    let data = await this.EmployeeRep.findOne({ where: { id: id } });

    if (!data) return this.EmployeeRep.findOneOrFail({ where: { id: id } });

    console.log(data);

    data = Object.assign(data, inData);
    data.dateUpd = new Date(Date.now());

    console.log(data);

    return this.EmployeeRep.save(data);
  }

  async DelOne(id: number): Promise<any> {
    return await this.EmployeeRep.delete(id);
  }
}
