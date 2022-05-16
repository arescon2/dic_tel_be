import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Person } from '../priem/person.entity';
import { IComment } from 'src/modules/tickets/interfaces/comment.i';
import { Issue } from './issue.entity';

@Entity({
  schema: 'tickets',
})
export class Comment implements IComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateCreate: Date;

  @Column()
  text: string;

  @ManyToOne(() => Person, (val) => val.issues)
  @JoinColumn()
  author: Person;

  @ManyToOne(() => Issue, (val) => val.comments)
  @JoinColumn()
  issue: Issue;
}
