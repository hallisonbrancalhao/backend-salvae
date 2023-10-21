import { Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Coordenadas } from './coordenadas.entity';

@Entity({ name: 'Mapa' })
export class Mapa {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Coordenadas, (coordenadas) => coordenadas.mapa, {
    cascade: true,
  })
  @JoinColumn({ name: 'coordenadasId' })
  coordenadas: Coordenadas;
}
