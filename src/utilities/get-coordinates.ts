import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GeocodingService {
  async getCoordinates(
    cep: string,
    numero: string,
  ): Promise<{ latitude: string; longitude: string }> {
    const endereco = `${numero} ${cep}, Brazil`;

    try {
      const response = await fetch(
        `${process.env.GOOGLE_MAPS_BASE_URL}${endereco}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      );

      if (response.ok) {
        const data = await response.json();
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        throw new Error(
          'Não foi possível obter as coordenadas. ' + response.statusText,
        );
      }
    } catch (error) {
      throw new BadRequestException('Erro ao buscar as coordenadas:', error);
    }
  }
}
