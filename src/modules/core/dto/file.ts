import { ApiProperty } from '@nestjs/swagger';

export class FileCreateDto {
  @ApiProperty()
  file: Express.Multer.File;

  @ApiProperty({
    required: false,
  })
  id?: number;
}
