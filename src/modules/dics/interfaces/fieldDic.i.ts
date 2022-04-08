import { IIdName } from 'src/interfaces/idName.i';
import { IRoot } from 'src/interfaces/root.i';
import { IOtdels } from './otdels.i';

export interface IFieldDic extends IRoot {
  fam: string;
  im: string;
  otch?: string;

  position: IIdName;
  otdel: IOtdels;

  mobile: string;
  worktel: string;

  email?: string;
}
