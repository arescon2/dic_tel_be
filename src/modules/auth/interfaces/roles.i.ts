import { IRoot } from 'src/interfaces/root.i';
import { IAccess } from './access.i';
import { IApps } from './apps';

/**
 *  Объект Роли
 *
 * @param {string} name Имя (уникальное) роли
 * @param {string} title Название роли
 * @param {number?} parent можно унаследоваться от другой роли
 * @param {number?} nsiRoleId Id роли из справочника НСИ
 * @param {srting?} nsiRoleName Id роли из справочника НСИ
 * @param {boolean} exclude можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
 *
 */
export interface IRoles extends IRoot {
  name: string;
  title: string;
  parent?: number;

  accesses?: IAccess[];

  exclude: boolean;
}
