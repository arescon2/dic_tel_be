import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Iissue } from 'src/modules/tickets/interfaces/ticket.i';
import { Person } from '../priem/person.entity';
import { Root } from '../root.entity';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { TypeTicket } from './typeTicket.entity';
import { CategoryTicket } from './categoryTicket.entity';
import { StatusTicket } from './statusTicket.entity';
import { Comment } from './comment.entity';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';
import { Organization } from '../dics/organizations.entity';

@Entity({
  schema: 'tickets',
})
export class Issue extends Root implements Iissue {
  @Column()
  title: string;

  @Column({ nullable: true })
  descr?: string;

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: Organization;

  @ManyToOne(() => Person, (val) => val.issues)
  @JoinColumn()
  author: Person;

  @ManyToOne(() => Person, (val) => val.issues)
  @JoinColumn()
  responder?: Person;

  @ManyToOne(() => TypeTicket)
  @JoinColumn()
  type?: TypeTicket;

  @ManyToOne(() => CategoryTicket)
  @JoinColumn()
  category?: CategoryTicket;

  @ManyToOne(() => StatusTicket)
  @JoinColumn()
  status?: StatusTicket;

  @OneToMany(() => Comment, (val) => val.issue)
  comments?: Comment;

  @Column({ default: false })
  closed: boolean;
}
