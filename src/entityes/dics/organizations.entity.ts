import { Entity, Column, Tree, TreeChildren, TreeParent } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IOrganization } from 'src/modules/dics/interfaces/organizations.i';

@Entity({
  schema: 'dics',
})
@Tree('closure-table')
export class Organization extends Root implements IOrganization {
  @Column({ nullable: true })
  name: string;

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

  @Column({ nullable: false, default: false })
  exclude: boolean;
}
