import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { Iissue } from './ticket.i';

export interface IComment {
  id: number;

  text: string;

  author: IPerson;

  issue: Iissue;

  parent?: IComment;
}
