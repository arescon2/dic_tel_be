import { ApiProperty } from '@nestjs/swagger';
import { RootDto } from 'src/rootDto/root.dto';

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class LoginPassDto extends RootDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Логин' не должен быть пустым",
  })
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Пароль' не должен быть пустым",
  })
  password: string;
}

export class CreateAccauntDto extends LoginPassDto {
  @ApiProperty()
  otch?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Эл.Почта' не должен быть пустым",
  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone?: number;
}

export class AddRolesToUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'id' не должен быть пустым",
  })
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Роли' не должен быть пустым",
  })
  @IsArray()
  roles: string[];
}
