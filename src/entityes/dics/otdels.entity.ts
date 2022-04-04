import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { IOtdels } from 'src/modules/dics/interfaces/otdels.i';
import { Organization } from './organizations.entity';

@Entity({
  schema: 'dics',
})
export class Otdels implements IOtdels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToOne(() => Organization, (org) => org.otdels)
  organization?: Organization;
}
