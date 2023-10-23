import { PartialType } from '@nestjs/swagger';
import { CreateEstabelecimentoDto } from './create-estabelecimento.dto';

export class UpdateEstabelecimentoDto extends PartialType(CreateEstabelecimentoDto) {}
