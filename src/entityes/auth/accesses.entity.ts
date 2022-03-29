import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IAccess } from 'src/modules/auth/interfaces/access.i';

@Entity({
  schema: 'auth',
})
export class Accesses implements IAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}

// // CRUD
// @Column({
//   default: false,
// })
// create: boolean;
// @Column({
//   default: true,
// })
// read: boolean;
// @Column({
//   default: false,
// })
// update: boolean;
// @Column({
//   default: false,
// })
// delete: boolean;
