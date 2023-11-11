import { Promocao, User } from '../entities';

export interface CupomEncontradoDto {
  id: number;
  codigo: string;
  dataValidade: Date;
  status: string;
  promocao: Promocao;
  user: User;
}
