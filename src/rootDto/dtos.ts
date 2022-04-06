import { ApiProperty } from '@nestjs/swagger';

export class PaginFilterOrderClass {
  @ApiProperty({ required: false })
  page: number;
  @ApiProperty({ required: false })
  limit: number;
  @ApiProperty({ required: false })
  orderby: string;
  @ApiProperty({ required: false })
  order: number;
  @ApiProperty({ required: false })
  filters: string;
}

export class NameDto {
  @ApiProperty()
  name: string;
}
