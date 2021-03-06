import { IRoot } from 'src/interfaces/root.i';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { IApps } from './apps';
import { IRoles } from './roles.i';

export interface IAccaunt extends IRoot {
  login: string;
  password: string;

  email: string;
  phone?: number;

  person?: IPerson;
  organization?: IOrganization;

  roles?: IRoles[];
  apps?: IApps[];

  exclude: boolean; // можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
}
