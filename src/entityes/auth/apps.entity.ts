import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IAccess } from 'src/modules/auth/interfaces/access.i';
import { IApps } from 'src/modules/auth/interfaces/apps';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  schema: 'auth',
})
export class Apps implements IApps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  descr?: string;

  @Column({
    default: false,
  })
  exclude: boolean;
}
