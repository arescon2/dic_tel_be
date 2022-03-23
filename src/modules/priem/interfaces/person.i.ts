import { IRoot } from 'src/interfaces/root.i';

export interface IPerson extends IRoot {
  fam?: string;
  im?: string;
  otch?: string;
  dateBirth?: Date;
  sex?: number;
  sexText?: string;
}
