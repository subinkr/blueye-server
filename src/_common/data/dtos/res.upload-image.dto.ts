import { ApiProperty } from '@nestjs/swagger';
import { mockResUploadImage } from 'src/_mock/dtos/data/res.upload-image.dto';

export class ResUploadImageDto {
  @ApiProperty({ example: mockResUploadImage.image })
  image: string;
}
