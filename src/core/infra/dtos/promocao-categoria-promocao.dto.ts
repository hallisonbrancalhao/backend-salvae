import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class PromocaoCategoriaPromocaoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idPromocao: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idCategoriaPromocao: number;
}
