import { IRoot } from 'src/interfaces/root.i';

export interface IOrganization extends IRoot {
  parent?: number; // Головная организация
  owner?: string; // владелец сертификата для ЭЛН

  frmo?: string; // ключ к ФРМО
  resource_id?: string; // id MDLP
  code_foms?: string; // КОД МО по справочнику ФОМС

  shortname?: string; // короткое название
  name: string; // Название организации

  type: string; // Тип организации

  address_legal?: string; // Юридический адрес
  address_actual?: string; // Фактический адрес

  inn?: string; // ИНН организации
  ogrn?: string;

  phone?: string;
  logo?: string;

  fio_glavbuh?: string; // ФИО главного бухгалтера
  fio_director?: string; // ФИО руководителя
}
