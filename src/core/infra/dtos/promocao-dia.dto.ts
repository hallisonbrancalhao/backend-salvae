import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class PromocaoDiaDto {
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
  idDiaFuncionamento: number;
}
