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
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    nullable: true,
    unique: true,
  })
  phone?: number;

  @ApiProperty()
  @Column({
    unique: true,
  })
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

  @ManyToMany(() => Apps)
  @JoinTable()
  apps: Apps[];

  @Column({ default: false })
  exclude: boolean;
}
