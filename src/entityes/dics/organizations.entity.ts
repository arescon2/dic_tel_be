import {
  Entity,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';
import { Otdels } from './otdels.entity';

@Entity({
  schema: 'dics',
})
@Tree('closure-table')
export class Organization extends Root implements IOrganization {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  short?: string;

  @Column({ unique: true })
  inn: number;

  @Column({ nullable: true })
  ogrn?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  index?: number;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  tel?: string;

  @TreeChildren()
  children: Organization[];

  @TreeParent()
  parent: Organization;

  @OneToMany(() => Otdels, (otdel) => otdel.id)
  @JoinColumn()
  otdels?: Otdels[];

  @Column({ nullable: false, default: false })
  exclude: boolean;
}
