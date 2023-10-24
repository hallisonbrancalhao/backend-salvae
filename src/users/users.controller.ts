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
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnderecoService } from 'src/endereco/endereco.service';

@ApiTags('Usuários')
@Controller('usuario')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly enderecoService: EnderecoService,
  ) {}

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
      if (createUserDto.endereco)
        this.enderecoService.create(createUserDto.endereco);
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
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @UseGuards(AuthGuard)
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

  @ApiOperation({ summary: 'Encontrar usuário por Email' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiParam({ name: 'Email', type: 'string', description: 'Email do usuário' })
  @UseGuards(AuthGuard)
  @Get(':email')
  async findOne(@Param('email') email: string) {
    try {
      return await this.usersService.findOne(email);
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

  @ApiOperation({ summary: 'Alterar usuário por email' })
  @ApiHeaders([
    { name: 'Authorization', required: true, description: 'Bearer <token>' },
  ])
  @ApiResponse({ status: 200, description: 'Usuário alterado com sucesso.' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'Email', type: 'string', description: 'Email do usuário' })
  @UseGuards(AuthGuard)
  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.usersService.update(email, updateUserDto);
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

  @ApiOperation({ summary: 'Excluir usuário por Email' })
  @ApiHeaders([{ name: 'Authorization', description: 'Bearer token' }])
  @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso.' })
  @ApiParam({ name: 'email', type: 'string', description: 'Email do usuario ' })
  @UseGuards(AuthGuard)
  @Delete(':email')
  async delete(@Param('email') email: string) {
    try {
      return await this.usersService.delete(email);
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
