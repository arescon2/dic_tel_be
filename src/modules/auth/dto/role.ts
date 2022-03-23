import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RootDto } from 'src/rootDto/root.dto';
import { IRoles } from '../interfaces/roles.i';

export class RoleCreateDto extends RootDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле title не может быть пустым',
  })
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле name не может быть пустым',
  })
  name: string;

  @ApiProperty({ required: false })
  parent?: number;

  @ApiProperty({ required: false })
  nsiRoleId?: number;

  @ApiProperty({ required: false })
  @ApiProperty()
  nsiRoleName?: string;
}

export class RoleUpdDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'ID не передан',
  })
  id: number;

  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  parent?: number;

  @ApiProperty({ required: false })
  nsiRoleId?: number;

  @ApiProperty({ required: false })
  nsiRoleName?: string;
}
