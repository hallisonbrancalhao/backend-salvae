import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
  AuthEstabelecimentoGuard,
  CreateEstabelecimentoDto,
  UpdateEstabelecimentoDto,
  UploadImageDto,
} from 'src/core/infra';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'fotoCapa', maxCount: 1 },
      { name: 'fotoPerfil', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      fotoCapa?: Express.Multer.File[];
      fotoPerfil?: Express.Multer.File[];
    },
    @Body() createEstabelecimentoDto: CreateEstabelecimentoDto,
  ) {
    try {
      if (files.fotoCapa && files.fotoCapa[0]) {
        createEstabelecimentoDto.fotoCapa = files.fotoCapa[0];
      }
      if (files.fotoPerfil && files.fotoPerfil[0]) {
        createEstabelecimentoDto.fotoPerfil = files.fotoPerfil[0];
      }
      return await this.estabelecimento.create(createEstabelecimentoDto);
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
  @Get()
  async findAll() {
    try {
      return await this.estabelecimento.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Nenhum estabelecimento encontrado.' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Listar todas categorias' })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  @Get('categorias')
  async getAllCategorias() {
    try {
      return await this.estabelecimento.getAllCategorias();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Nenhum estabelecimento encontrado.' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Encontrar estabelecimento por ' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 302, description: 'Estabelecimento encontrado' })
  @ApiResponse({ status: 404, description: 'Estabelecimento não encontrado' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id do estabelecimento',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.estabelecimento.findOne(id);
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
    name: 'id',
    type: 'string',
    description: 'id do estabelecimento',
  })
  @UseGuards(AuthEstabelecimentoGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    try {
      return await this.estabelecimento.update(id, updateEstabelecimentoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Não foi possível alterar o estabelecimento.' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Excluir estabelecimento por id' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({
    status: 200,
    description: 'Estabelecimento excluído com sucesso.',
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
      return await this.estabelecimento.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: 'Não foi possível excluir o estabelecimento.' + error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
