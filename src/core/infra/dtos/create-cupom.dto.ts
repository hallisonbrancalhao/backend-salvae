import { IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCupomDto {
  @ApiProperty()
  @IsNumber()
  idUsuario: number;

  @ApiProperty()
  @IsNumber()
  idPromocao: number;
}
