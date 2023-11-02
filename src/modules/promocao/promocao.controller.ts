import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PromocaoService } from './promocao.service';
import { CreatePromocaoDto } from 'src/core/infra';

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
    // }

    // @ApiOperation({ summary: 'Listar todos estabelecimentos' })
    // @ApiResponse({ status: 200, description: 'Lista de estabelecimentos' })
    // @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
    // @UseGuards(AuthEstabelecimentoGuard)
    // @Get()
    // async findAll() {
    //   try {
    //     return await this.estabelecimento.findAll();
    //   } catch (error) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.BAD_REQUEST,
    //         error: 'Nenhum estabelecimento encontrado.' + error.message,
    //       },
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    // }

    // @ApiOperation({ summary: 'Encontrar estabelecimento por ' })
    // @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
    // @ApiResponse({ status: 302, description: 'Estabelecimento encontrado' })
    // @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
    // @ApiParam({
    //   name: 'Cnpj',
    //   type: 'string',
    //   description: 'Cnpj do estabelecimento',
    // })
    // @UseGuards(AuthEstabelecimentoGuard)
    // @Get(':cnpj')
    // async findOne(@Param('cnpj') cnpj: string) {
    //   try {
    //     return await this.estabelecimento.findOne(cnpj);
    //   } catch (error) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.BAD_REQUEST,
    //         error: error.message,
    //       },
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    // }

    // @ApiOperation({ summary: 'Alterar estabelecimento por ' })
    // @ApiHeaders([
    //   { name: 'Authorization', required: true, description: 'Bearer <token>' },
    // ])
    // @ApiResponse({
    //   status: 200,
    //   description: 'Estabelecimento alterado com sucesso.',
    // })
    // @ApiBody({ type: UpdateEstabelecimentoDto })
    // @ApiParam({
    //   name: 'Cnpj',
    //   type: 'string',
    //   description: 'Cnpj do estabelecimento',
    // })
    // @UseGuards(AuthEstabelecimentoGuard)
    // @Patch(':cnpj')
    // async update(
    //   @Param('cnpj') cnpj: string,
    //   @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
    // ) {
    //   try {
    //     return await this.estabelecimento.update(cnpj, updateEstabelecimentoDto);
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

    // @ApiOperation({ summary: 'Excluir estabelecimento por Cnpj' })
    // @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
    // @ApiResponse({
    //   status: 200,
    //   description: 'Estabelecimento excluído com sucesso.',
    // })
    // @ApiParam({
    //   name: 'cnpj',
    //   type: 'string',
    //   description: 'cnpj do estabelecimento ',
    // })
    // @UseGuards(AuthEstabelecimentoGuard)
    // @Delete(':cnpj')
    // async delete(@Param('cnpj') cnpj: string) {
    //   try {
    //     return await this.estabelecimento.delete(cnpj);
    //   } catch (error) {
    //     throw new HttpException(
    //       {
    //         status: HttpStatus.BAD_GATEWAY,
    //         error: 'Não foi possível excluir o estabelecimento.' + error.message,
    //       },
    //       HttpStatus.BAD_GATEWAY,
    //     );
    //   }
  }
}
