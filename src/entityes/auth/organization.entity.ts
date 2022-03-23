import { Entity, Column } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IOrganization } from 'src/modules/auth/interfaces/organization.i';

@Entity({
  schema: 'auth',
})
export class organization extends Root implements IOrganization {
  @Column({ nullable: true })
  parent?: number;
  @Column({ nullable: true })
  owner?: string;
  @Column({ nullable: true })
  frmo?: string;
  @Column({ nullable: true })
  resource_id?: string;
  @Column({ nullable: true })
  code_foms?: string;
  @Column({ nullable: true })
  shortname?: string;
  @Column()
  name: string;
  @Column()
  type: string;
  @Column({ nullable: true })
  address_legal?: string;
  @Column({ nullable: true })
  address_actual?: string;
  @Column({ nullable: true })
  inn?: string;
  @Column({ nullable: true })
  ogrn?: string;
  @Column({ nullable: true })
  phone?: string;
  @Column({ nullable: true })
  logo?: string;
  @Column({ nullable: true })
  fio_glavbuh?: string;
  @Column({ nullable: true })
  fio_director?: string;
}
