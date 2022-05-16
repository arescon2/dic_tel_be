import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginFilterOrderClass {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  orderby: string;
  @ApiProperty({ required: false })
  order: number;
  @ApiProperty({ required: false })
  filters: string;
}

export class NameDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Цвет" не может быть пустым',
  })
  name: string;
}

export class NameUpdDto {
  @ApiProperty({ required: false })
  name: string;
}
