import { ApiProperty } from '@nestjs/swagger';
import { RootDto } from 'src/rootDto/root.dto';

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class UpdateAccuntDto {
  @ApiProperty({ required: false })
  login?: string;

  @ApiProperty({ required: false })
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiProperty({ required: false })
  email?: string;

  // @ApiProperty({ required: false })
  // @Type(() => Number)
  // organization?: number;
}

export class CreateAccauntDto extends LoginPassDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'ID Пользователя не передан',
  })
  @Type(() => Number)
  person: number;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'Логин' не должен быть пустым",
  })
  login: string;

  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'email' не должен быть пустым",
  })
  email: string;

  // @ApiProperty({ required: false })
  // @Type(() => Number)
  // organization?: number;
}

export class AddRolesToUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'id' не должен быть пустым",
  })
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsArray()
  roles: number[];
}

export class AddAppsToUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: "Поле 'id' не должен быть пустым",
  })
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsArray()
  apps: number[];
}
