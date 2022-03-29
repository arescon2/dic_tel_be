import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RoleCreateDto {
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
}

export class RoleUpdDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  parent?: number;
}
