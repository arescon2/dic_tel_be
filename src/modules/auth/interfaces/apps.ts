export interface IApps {
  id: number;
  uid: string;
  name: string; // название Приложения

  descr?: string; // описание

  exclude: boolean; // можно использовать для админ вещей (чтобы не попадало в общие статистики и т.д.)
}
