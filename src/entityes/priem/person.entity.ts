import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  schema: 'persData',
})
export class Person extends Root implements IPerson {
  @Column({ nullable: true })
  @ApiProperty()
  im: string;

  @Column({ nullable: true })
  @ApiProperty()
  fam: string;

  @Column({ nullable: true })
  @ApiProperty()
  otch: string;

  @Column({ nullable: true })
  @ApiProperty()
  dateBirth: Date;

  @Column({ nullable: true })
  @ApiProperty()
  sex: number;

  @Column({ nullable: true })
  @ApiProperty()
  sexText: string;
}
