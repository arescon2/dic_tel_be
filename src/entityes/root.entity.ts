import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IRoot } from 'src/interfaces/root.i';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Root implements IRoot {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  uid: string;

  @Column()
  @ApiProperty()
  dateCreate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  dateUpd: Date;

  @Column({ default: true })
  isActive: boolean;
}
