import { IRoot } from 'src/interfaces/root.i';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';
import { Iissue } from 'src/modules/tickets/interfaces/ticket.i';

export interface IPerson extends IRoot {
  fam?: string;
  im?: string;
  otch?: string;

  dateBirth?: Date;

  organization?: IOrganization;

  sex?: number;
  sexText?: string;

  issues?: Iissue;
}
