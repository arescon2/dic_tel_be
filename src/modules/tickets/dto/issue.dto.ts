import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class IssueCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Заголовок" не может быть пустым',
  })
  title: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Сообщение" не может быть пустым',
  })
  descr: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Тип" не может быть пустым',
  })
  @Type(() => Number)
  type: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Получатель" не может быть пустым',
  })
  @Type(() => Number)
  responder: number;
}

export class IssueUpdDto {
  @ApiProperty()
  descr: string;

  @ApiProperty()
  @Type(() => Number)
  type: number;
}
