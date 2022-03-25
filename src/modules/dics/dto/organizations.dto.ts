import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrganizationCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле Название не может быть пустым',
  })
  name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле ИНН не может быть пустым',
  })
  inn: number;

  @ApiProperty({ required: false })
  ogrn?: number;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  index?: number;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  tel?: string;

  @ApiProperty({ required: false })
  parent?: number;
}

export class OrganizationUpdateDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  @ApiProperty()
  inn?: number;

  @ApiProperty({ required: false })
  ogrn?: number;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  index?: number;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  tel?: string;
}
