import { IRoot } from 'src/interfaces/root.i';

export interface IAccess extends IRoot {
  parent?: number; // можно унаследоваться от другого доступа

  name: string; // название доступа
  targetname: string; // тип цели
  targetid: number; // id цели
  global: boolean; // глобальная настройка

  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;

  exclude: boolean; // можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
}
