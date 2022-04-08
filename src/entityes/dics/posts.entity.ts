import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IIdName } from 'src/interfaces/idName.i';
import { Employee } from './employee.entity';

@Entity({
  schema: 'dics',
})
export class Posts implements IIdName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (val) => val.position)
  fields?: Employee[];
}
