import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Id' не должен быть пустым",
  })
  id: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'userId' не должен быть пустым",
  })
  userid: number;
}
