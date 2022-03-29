import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IAccaunt } from 'src/modules/auth/interfaces/accaunt.i';
import { Root } from 'src/entityes/root.entity';
import { Person } from '../priem/person.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from './roles.entity';
import { Organization } from '../dics/organizations.entity';
import { Apps } from './apps.entity';

@Entity({
  schema: 'auth',
})
export class Accaunt extends Root implements IAccaunt {
  @Column()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  phone?: number;

  @ApiProperty()
  @Column()
  login: string;

  @Column()
  password: string;

  @ApiProperty()
  @ManyToMany(() => Roles, {
    cascade: true,
  })
  @JoinTable()
  public roles?: Roles[];

  @ApiProperty()
  @OneToOne(() => Person)
  @JoinColumn()
  person?: Person;

  @ApiProperty()
  @OneToOne(() => Organization)
  @JoinColumn()
  organization?: Organization;

  @ManyToMany(() => Apps)
  @JoinTable()
  apps: Apps[];

  @Column({ default: false })
  exclude: boolean;
}
