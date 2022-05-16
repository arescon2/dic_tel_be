import { IIdName } from 'src/interfaces/idName.i';
import { IRoot } from 'src/interfaces/root.i';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { IComment } from './comment.i';

export interface Iissue extends IRoot {
  title: string;
  descr?: string;

  organization: IOrganization;
  author: IPerson;

  responder?: IPerson;

  type?: IIdName;
  category?: IIdName;
  status?: IIdName;

  comments?: IComment;

  closed: boolean;
}
