import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IFieldDic } from 'src/modules/dics/interfaces/fieldDic.i';
import { Posts } from './posts.entity';
import { Otdels } from './otdels.entity';
import { Root } from '../root.entity';

@Entity({
  schema: 'dics',
})
export class Employee extends Root implements IFieldDic {
  @Column()
  fam: string;
  @Column()
  im: string;
  @Column({
    nullable: true,
  })
  otch?: string;

  @ManyToOne(() => Posts, (val) => val.fields)
  position: Posts;

  @ManyToOne(() => Otdels, (val) => val.fields)
  otdel: Otdels;

  @Column()
  mobile: string;

  @Column()
  worktel: string;

  @Column({
    nullable: true,
  })
  email?: string;
}
