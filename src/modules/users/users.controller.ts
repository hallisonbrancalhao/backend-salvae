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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, AuthUserGuard } from 'src/core/infra';

@ApiTags('Usuários')
@Controller('usuario')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar novo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario criado com sucesso.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados do usuário a ser criado.',
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto);
      return {
        status: 201,
        description: 'Usuario criado com sucesso.',
      };
    } catch (error) {
      return new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível criar o usuário.' + error,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar todos usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @UseGuards(AuthUserGuard)
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Nenhum usuário encontrado.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @ApiOperation({ summary: 'Encontrar usuário por ID' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiParam({ name: 'ID', type: 'string', description: 'ID do usuário' })
  @UseGuards(AuthUserGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuário não encontrado',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @ApiOperation({ summary: 'Alterar usuário por ID' })
  @ApiHeaders([
    { name: 'Authorization', required: true, description: 'Bearer <token>' },
  ])
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'ID', type: 'string', description: 'ID do usuário' })
  @UseGuards(AuthUserGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_MODIFIED,
          error: 'Não foi possível alterar o usuário.',
        },
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  @ApiOperation({ summary: 'Excluir usuário por ID' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiParam({ name: 'ID', type: 'string', description: 'ID do usuario ' })
  @UseGuards(AuthUserGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.usersService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Não foi possível excluir o usuário.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
