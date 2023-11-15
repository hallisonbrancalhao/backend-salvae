import {
  Body,
  Controller,
  Delete,
  Get,
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
  AuthEstabelecimentoGuard,
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
      const cupom = await this.cupomService.create(createCupomDto);
      return { cupom };
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

  @ApiOperation({ summary: 'Listar cupons' })
  @ApiResponse({
    status: 200,
    description: 'Cupons listados com sucesso.',
  })
  @UseGuards(AuthUserGuard)
  @Get('')
  async findAll() {
    try {
      return await this.cupomService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível listar os cupons.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar cupons por usuário' })
  @ApiResponse({
    status: 200,
    description: 'Cupons listados com sucesso.',
  })
  @UseGuards(AuthUserGuard)
  @Get('usuario/:id')
  async findByUser(@Param('id') id: string) {
    try {
      return await this.cupomService.findByUser(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível listar os cupons.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  @ApiOperation({ summary: 'Listar cupons por promocao' })
  @ApiResponse({
    status: 200,
    description: 'Cupons listados com sucesso.',
  })
  @UseGuards(AuthUserGuard)
  @Get('promocao/:id')
  async findByPromocao(@Param('id') id: string) {
    try {
      return await this.cupomService.findByPromocao(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível listar os cupons.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar cupons por Código' })
  @ApiResponse({
    status: 200,
    description: 'Cupons listados com sucesso.',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Get('codigo/:codigo')
  async findByCodigo(@Param('codigo') codigo: string) {
    try {
      return await this.cupomService.findByCodigo(codigo);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível listar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Desativar cupom' })
  @ApiResponse({
    status: 200,
    description: 'Cupom desativado com sucesso.',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Post('desativar')
  async desativar(@Body() { codigo }: { codigo: string }) {
    try {
      return await this.cupomService.desativar({ codigo });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível desativar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Ativar cupom' })
  @ApiResponse({
    status: 200,
    description: 'Cupom ativado com sucesso.',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Post('ativar')
  async ativar(@Body() { codigo }: { codigo: string }) {
    try {
      return await this.cupomService.ativar({ codigo });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível ativar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Deletar cupom' })
  @ApiResponse({
    status: 200,
    description: 'Cupom deletado com sucesso.',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.cupomService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível deletar o cupom.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
