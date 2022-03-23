import { Entity, Column } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IAccess } from 'src/modules/auth/interfaces/access.i';

@Entity({
  schema: 'auth',
})
export class Accesses extends Root implements IAccess {
  @Column({
    nullable: true,
  })
  parent?: number;
  @Column()
  name: string;

  @Column()
  targetname: string;
  @Column()
  targetid: number;
  @Column({
    default: false,
  })
  global: boolean;

  // CRUD
  @Column({
    default: false,
  })
  create: boolean;
  @Column({
    default: true,
  })
  read: boolean;
  @Column({
    default: false,
  })
  update: boolean;
  @Column({
    default: false,
  })
  delete: boolean;

  @Column({ default: false })
  exclude: boolean;
}
