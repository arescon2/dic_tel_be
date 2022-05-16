import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { NameDto, NameUpdDto } from 'src/rootDto/dtos';

export class StatusTicketCreateDto extends NameDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Цвет" не может быть пустым',
  })
  color: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Код" не может быть пустым',
  })
  code: string;

  @ApiProperty({ required: false })
  main?: string;
}

export class StatusTicketUpdDto extends NameUpdDto {
  @ApiProperty({ required: false })
  color?: string;

  @ApiProperty({ required: false })
  code?: string;

  @ApiProperty({ required: false })
  main?: string;
}
