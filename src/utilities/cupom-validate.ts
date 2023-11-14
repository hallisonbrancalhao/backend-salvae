import { StatusCupom } from 'src/core/enum/status-cupom.enum';
import { Cupom } from '../core/infra';

export function validateCupom(idPromocao: string, cupom: Cupom) {
  if (cupom.promocao.id != Number(idPromocao)) {
    throw new Error('Cupom inválido');
  }
  if (cupom.dataValidade < new Date()) {
    throw new Error('Cupom expirado');
  }
  if (cupom.status !== StatusCupom.ATIVO) {
    throw new Error('Cupom não está ativo');
  }

  return true;
}
