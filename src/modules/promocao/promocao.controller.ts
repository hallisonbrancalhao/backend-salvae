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
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PromocaoService } from './promocao.service';
import {
  AuthEstabelecimentoGuard,
  CreatePromocaoDto,
  UpdatePromocaoDto,
} from 'src/core/infra';

@ApiTags('Promocao')
@Controller('promocao')
export class PromocaoController {
  constructor(private readonly promocao: PromocaoService) {}

  @ApiOperation({ summary: 'Cadastrar promoção' })
  @ApiResponse({
    status: 201,
    description: 'Promoção criado com sucesso.',
  })
  @ApiBody({
    type: CreatePromocaoDto,
    description: 'Dados da promoção a ser criada.',
  })
  @Post()
  async create(@Body() createPromocaoDto: CreatePromocaoDto) {
    try {
      await this.promocao.create(createPromocaoDto);
      return {
        status: 201,
        description: 'Promoção criada com sucesso.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível criar a promocao.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar todas as promocoes' })
  @ApiResponse({ status: 200, description: 'Lista de promocoes' })
  @Get()
  async findAll() {
    try {
      return await this.promocao.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Nenhuma promocao encontrada.' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Encontrar promoção por Id' })
  @ApiResponse({ status: 302, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id da promocao',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.promocao.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //TODO: Finalizar implementação do update
  // @ApiOperation({ summary: 'Alterar promocao por ID' })
  // @ApiHeaders([
  //   { name: 'Authorization', required: true, description: 'Bearer <token>' },
  // ])
  // @ApiResponse({
  //   status: 200,
  //   description: 'Promoçao alterada com sucesso.',
  // })
  // @ApiBody({ type: UpdatePromocaoDto })
  // @ApiParam({
  //   name: 'ID',
  //   type: 'string',
  //   description: 'Id do estabelecimento',
  // })
  // @UseGuards(AuthEstabelecimentoGuard)
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePromocaoDto: UpdatePromocaoDto,
  // ) {
  //   try {
  //     return await this.promocao.update(id, updatePromocaoDto);
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error: 'Não foi possível alterar o estabelecimento.' + error.message,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  @ApiOperation({ summary: 'Excluir promocao por id' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({
    status: 200,
    description: 'Promocao excluído com sucesso.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'id do estabelecimento ',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.promocao.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Não foi possível excluir a promocao. ' + error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
