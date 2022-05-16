import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Istatus } from 'src/modules/tickets/interfaces/status.i';

@Entity({
  schema: 'dics',
})
export class StatusTicket implements Istatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  code?: string;

  @Column({ default: false })
  main?: boolean;
}
