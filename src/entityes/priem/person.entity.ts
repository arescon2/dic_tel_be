import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { Organization } from '../dics/organizations.entity';
import { Issue } from '../tickets/issue.entity';

@Entity({
  schema: 'persData',
})
export class Person extends Root implements IPerson {
  @Column({ nullable: true })
  im: string;

  @Column({ nullable: true })
  fam: string;

  @Column({ nullable: true })
  otch: string;

  @Column({ nullable: true })
  dateBirth: Date;

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization?: Organization;

  @OneToMany(() => Issue, (val) => val.author)
  issues?: Issue;

  @Column({ nullable: true })
  sex: number;

  @Column({ nullable: true })
  sexText: string;
}
