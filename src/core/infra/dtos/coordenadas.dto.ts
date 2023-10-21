import { ApiProperty } from '@nestjs/swagger';

export class CoordenadasDto {
  @ApiProperty({ example: '-23.5505199' })
  latitude: string;

  @ApiProperty({ example: '-46.6333094' })
  longitude: string;
}
