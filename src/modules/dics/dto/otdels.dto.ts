import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OtdelsCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле Название не может быть пустым',
  })
  name: string;

  organization?: string;
}

export class OtdelsUpdateDto {
  @ApiProperty({ required: false })
  name?: string;
}
