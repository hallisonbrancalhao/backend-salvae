import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsNumber } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNumber()
  cpf: number;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  senha: string;
}
