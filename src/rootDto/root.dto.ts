import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IRoot } from 'src/interfaces/root.i';

export class RootDto {
  id: number;
  uid: string;
  dateCreate: Date;
  dateUpd: Date;
  exclude: boolean;
  isActive: boolean;
}

export class GetDto {
  @ApiProperty({ required: false })
  id?: number;
  @ApiProperty({ required: false })
  isActive?: boolean;
}

export class DeleteDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'empty, id',
  })
  id: number;
}
