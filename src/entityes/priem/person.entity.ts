import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IPerson } from 'src/modules/priem/interfaces/person.i';
import { ApiProperty } from '@nestjs/swagger';
import { Organization } from '../dics/organizations.entity';
import { Accaunt } from '../auth/accaunt.entity';

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

  @ApiProperty()
  @ManyToOne(() => Organization)
  @JoinColumn()
  organization?: Organization;

  @Column({ nullable: true })
  @ApiProperty()
  sex: number;

  @Column({ nullable: true })
  @ApiProperty()
  sexText: string;
}
