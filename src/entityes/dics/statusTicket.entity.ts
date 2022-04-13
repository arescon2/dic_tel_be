import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IIdName } from 'src/interfaces/idName.i';

@Entity({
  schema: 'dics',
})
export class StatusTicket implements IIdName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => Employee, (val) => val.position)
  // fields?: Employee[];
}
