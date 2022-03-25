import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import { IsInt, IsNotEmpty } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Id' не должен быть пустым",
  })
  @Type(() => Number)
  id: number;
}

export class IdAndUserIdDto extends IdDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'userId' не должен быть пустым",
  })
  userid: number;
}
