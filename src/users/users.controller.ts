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
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  create(@Body() createUserDto: CreateUserDto) {
    try {
      this.usersService.create(createUserDto);
      return { status: 201, description: 'Usuario criado com sucesso.' };
    } catch (error) {
      return new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não foi possível criar o usuário.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Listar todos usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    try {
      this.usersService.findAll();
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

  @ApiOperation({ summary: 'Encontrar usuário por CPF' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiParam({ name: 'CPF', type: 'number', description: 'CPF do usuário' })
  @UseGuards(AuthGuard)
  @Get(':cpf')
  findOne(@Param('cpf') cpf: number) {
    try {
      return this.usersService.findOne(cpf);
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

  @ApiOperation({ summary: 'Alterar usuário por CPF' })
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'CPF', type: 'number', description: 'CPF do usuário' })
  @UseGuards(AuthGuard)
  @Patch(':cpf')
  update(@Param('cpf') cpf: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(cpf, updateUserDto);
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

  @ApiOperation({ summary: 'Excluir usuário por CPF' })
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiParam({ name: 'CPF', type: 'number', description: 'CPF ' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.usersService.delete(id);
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
