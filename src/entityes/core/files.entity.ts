import { Entity, Column } from 'typeorm';
import { Root } from 'src/entityes/root.entity';
import { IFiles } from 'src/modules/core/interfaces/files.i';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Files extends Root implements IFiles {
  @Column()
  @ApiProperty()
  name: string;
  @ApiProperty()
  @Column()
  originalname: string;
  @ApiProperty()
  @Column()
  type: string;
  @ApiProperty()
  @Column()
  path: string;
  @ApiProperty()
  @Column()
  size: number;
}
