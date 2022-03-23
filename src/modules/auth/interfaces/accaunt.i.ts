import { IRoot } from 'src/interfaces/root.i';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { IRoles } from './roles.i';

export interface IAccaunt extends IRoot {
  login: string;
  password: string;

  email: string;
  phone?: number;

  person?: IPerson;

  roles?: IRoles[];

  exclude: boolean; // можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
}
