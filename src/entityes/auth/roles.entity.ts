import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { Accesses } from './accesses.entity';
import { IRoles } from 'src/modules/auth/interfaces/roles.i';

@Entity({
  schema: 'auth',
})
export class Roles extends Root implements IRoles {
  @Column()
  name: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  parent?: number;

  @Column({
    nullable: true,
  })
  nsiRoleId: number;

  @Column({
    nullable: true,
  })
  nsiRoleName: string;

  @ManyToMany(() => Accesses)
  @JoinTable()
  accesses: Accesses[];

  @Column({ default: false })
  exclude: boolean;
}
