import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CupomValidateDto {
  @ApiProperty()
  @IsString()
  codigo: string;
}
