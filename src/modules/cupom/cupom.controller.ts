import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthUserGuard,
  CreateCupomDto,
  CupomValidateDto,
} from '../../core/infra';
import { CupomService } from './cupom.service';

@ApiTags('Cupom')
@Controller('cupom')
export class CupomController {
  constructor(private readonly cupomService: CupomService) {}

  @ApiOperation({ summary: 'Cadastrar cupom' })
  @ApiResponse({
    status: 201,
    description: 'Cupom criado com sucesso.',
  })
  @ApiBody({
    type: CreateCupomDto,
    description: 'Dados do cupom a ser criado.',
  })
  @UseGuards(AuthUserGuard)
  @Post()
  async create(@Body() createCupomDto: CreateCupomDto) {
    try {
      return await this.cupomService.create(createCupomDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível criar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Validar cupom' })
  @ApiResponse({
    status: 200,
    description: 'Cupom validado com sucesso.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id da promoção.',
  })
  @ApiBody({
    type: CupomValidateDto,
    description: 'Dados do cupom a ser criado.',
  })
  @Post('validar/:id')
  async validate(@Param('id') id: string, @Body() hash: CupomValidateDto) {
    try {
      return await this.cupomService.validate(id, hash);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível validar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
