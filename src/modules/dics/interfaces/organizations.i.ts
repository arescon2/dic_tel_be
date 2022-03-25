import { IRoot } from 'src/interfaces/root.i';

export interface IOrganization extends IRoot {
  name?: string;
  inn?: number;
  ogrn?: number;

  address?: string;
  index?: number;

  email?: string;
  tel?: string;

  parent?: IOrganization;
  children?: IOrganization[];

  exclude: boolean; // можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
}
