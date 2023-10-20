import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiHeaders,
} from '@nestjs/swagger';
import { EstabelecimentoService } from './estabelecimento.service';
import {
  AuthUserGuard,
  CreateEstabelecimentoDto,
  UpdateEstabelecimentoDto,
} from 'src/core/infra';

@ApiTags('Estabelecimentos')
@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(private readonly estabelecimento: EstabelecimentoService) {}

  @ApiOperation({ summary: 'Criar novo estabelecimento' })
  @ApiResponse({
    status: 201,
    description: 'Estabelecimento criado com sucesso.',
  })
  @ApiBody({
    type: CreateEstabelecimentoDto,
    description: 'Dados do estabelecimento a ser criado.',
  })
  @Post()
  async create(@Body() createEstabelecimentoDto: CreateEstabelecimentoDto) {
    try {
      await this.estabelecimento.create(createEstabelecimentoDto);
      return {
        status: 201,
        description: 'Estabelecimento criado com sucesso.',
      };
    } catch (error) {
      return new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível criar o estabelecimento.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar todos estabelecimentos' })
  @ApiResponse({ status: 200, description: 'Lista de estabelecimentos' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @UseGuards(AuthUserGuard)
  @Get()
  async findAll() {
    try {
      return await this.estabelecimento.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nenhum estabelecimento encontrado.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @ApiOperation({ summary: 'Encontrar estabelecimento por ' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 200, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiParam({
    name: 'Cnpj',
    type: 'string',
    description: 'Cnpj do estabelecimento',
  })
  @UseGuards(AuthUserGuard)
  @Get(':cnpj')
  async findOne(@Param('cnpj') cnpj: string) {
    try {
      return await this.estabelecimento.findOne(cnpj);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Estabelecimento não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @ApiOperation({ summary: 'Alterar estabelecimento por ' })
  @ApiHeaders([
    { name: 'Authorization', required: true, description: 'Bearer <token>' },
  ])
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento alterado com sucesso.',
  })
  @ApiBody({ type: UpdateEstabelecimentoDto })
  @ApiParam({
    name: 'Cnpj',
    type: 'string',
    description: 'Cnpj do estabelecimento',
  })
  @UseGuards(AuthUserGuard)
  @Patch(':cnpj')
  async update(
    @Param('cnpj') cnpj: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    try {
      return await this.estabelecimento.update(cnpj, updateEstabelecimentoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: 'Não foi possível alterar o estabelecimento.',
        },
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  @ApiOperation({ summary: 'Excluir estabelecimento por Cnpj' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento excluído com sucesso.',
  })
  @ApiParam({
    name: 'cnpj',
    type: 'string',
    description: 'cnpj do estabelecimento ',
  })
  @UseGuards(AuthUserGuard)
  @Delete(':cnpj')
  async delete(@Param('cnpj') cnpj: string) {
    try {
      return await this.estabelecimento.delete(cnpj);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Não foi possível excluir o estabelecimento.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
