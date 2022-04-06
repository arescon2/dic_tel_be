import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IIdName } from 'src/interfaces/idName.i';

@Entity({
  schema: 'dics',
})
export class Posts implements IIdName {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
