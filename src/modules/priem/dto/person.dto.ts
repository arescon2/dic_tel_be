import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RootDto } from 'src/rootDto/root.dto';

export class PersonCreateDto extends RootDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле Фамилия не может быть пустым',
  })
  fam: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле Имя не может быть пустым',
  })
  im: string;

  @ApiProperty({ required: false })
  otch?: string;

  @ApiProperty({ required: false })
  dateBirth?: Date;

  @ApiProperty({ required: false })
  sex?: Date;

  @ApiProperty({ required: false })
  sexName?: Date;
}

export class PersonUpdDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'ID не передан',
  })
  id: string;

  @ApiProperty({ required: false })
  fam: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  otch?: string;

  @ApiProperty({ required: false })
  dateBirth?: Date;
}

export class PersonGetDto extends RootDto {
  @ApiProperty({ required: false })
  fam?: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  otch?: string;

  @ApiProperty({ required: false })
  dateBirth?: Date;
}
