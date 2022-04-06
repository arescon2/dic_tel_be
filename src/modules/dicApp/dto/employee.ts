import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmployeeCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "ФИО" не может быть пустым',
  })
  fio: string;

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
  mobile: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле "Рабочий телефон" не может быть пустым',
  })
  worktel: number;

  @ApiProperty({ required: false })
  email?: string;
}

export class EmployeeUpdateDto {
  @ApiProperty({ required: false })
  fio?: string;

  @ApiProperty({ required: false })
  position?: number;

  @ApiProperty({ required: false })
  mobile?: number;

  @ApiProperty({ required: false })
  worktel?: number;

  @ApiProperty({ required: false })
  email?: string;
}
