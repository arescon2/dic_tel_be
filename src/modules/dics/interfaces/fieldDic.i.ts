import { IIdName } from 'src/interfaces/idName.i';
import { IRoot } from 'src/interfaces/root.i';
import { IOtdels } from './otdels.i';

export interface IFieldDic extends IRoot {
  fio: string;

  position: IIdName;
  otdel: IOtdels;

  mobile: number;
  worktel: number;

  email?: string;
}
