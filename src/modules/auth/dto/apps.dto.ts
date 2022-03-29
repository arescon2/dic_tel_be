import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { RootDto } from 'src/rootDto/root.dto';
import { IRoles } from '../interfaces/roles.i';

export class AppCreateDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Поле name не может быть пустым',
  })
  name: string;

  @ApiProperty({ required: false })
  descr?: string;
}

export class AppUpdDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  descr?: string;
}
