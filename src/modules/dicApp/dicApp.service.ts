import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entityes/dics/employee.entity';
import { Organization } from 'src/entityes/dics/organizations.entity';
import { Otdels } from 'src/entityes/dics/otdels.entity';
import { Repository } from 'typeorm';
import { IOrganization } from '../dics/interfaces/organizations.i';

@Injectable()
export class DicAppService {
  constructor(
    @InjectRepository(Organization)
    private OrgsRep: Repository<Organization>,
    @InjectRepository(Employee)
    private EmployeeRep: Repository<Employee>,
  ) {}

  async getListRoot(dev: boolean, userOrg?: IOrganization): Promise<any> {
    let andWhereVar = '';
    const andWhereObj = {};

    if (!dev) {
      andWhereVar += 'orgs.id = :id ';
      andWhereObj['id'] = userOrg.id;
    }

    const data = await this.OrgsRep.createQueryBuilder('orgs')
      .leftJoinAndSelect('orgs.otdels', 'otdels')
      .leftJoinAndSelect('otdels.fields', 'employee')
      .select(['orgs', 'otdels.id', 'otdels.name', 'employee'])
      .where(andWhereVar, andWhereObj)
      .getManyAndCount();

    return data;
  }

  
}
