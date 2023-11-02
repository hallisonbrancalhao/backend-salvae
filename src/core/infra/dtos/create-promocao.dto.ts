import { IsNumber, IsNotEmpty, IsArray, IsString } from 'class-validator';
import { PromocaoDiaDto } from './promocao-dia.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PromocaoCategoriaPromocaoDto } from './promocao-categoria-promocao.dto';

export class CreatePromocaoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idEstabelecimento: number;

  @ApiProperty({ type: [PromocaoCategoriaPromocaoDto] })
  @IsArray({ message: 'O campo promocaoCategoria deve ser um array' })
  promocaoCategoria: PromocaoCategoriaPromocaoDto[];

  @ApiProperty({ type: [PromocaoDiaDto] })
  @IsArray()
  @IsNotEmpty()
  promocaoDia: PromocaoDiaDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
