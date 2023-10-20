import { PartialType } from '@nestjs/swagger';
import { CreateEnderecoEstabelecimentoDto } from './create-endereco-estabelecimento.dto';

export class UpdateEnderecoEstabelecimentoDto extends PartialType(
  CreateEnderecoEstabelecimentoDto,
) {}
