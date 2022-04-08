import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class EmployeeCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Фамилия" не может быть пустым',
  })
  fam: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Имя" не может быть пустым',
  })
  im: string;

  @ApiProperty({ required: false })
  otch?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Должность" не может быть пустым',
  })
  position: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Отдел" не может быть пустым',
  })
  otdel: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Мобильный телефон" не может быть пустым',
  })
  mobile: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Рабочий телефон" не может быть пустым',
  })
  worktel: string;

  @ApiProperty({ required: false })
  email?: string;
}

export class EmployeeUpdateDto {
  @ApiProperty({ required: false })
  fam?: string;

  @ApiProperty({ required: false })
  im?: string;

  @ApiProperty({ required: false })
  otch?: string;

  @ApiProperty({ required: false })
  position?: number;

  @ApiProperty({ required: false })
  mobile?: string;

  @ApiProperty({ required: false })
  worktel?: string;

  @ApiProperty({ required: false })
  email?: string;
}
