import { HttpException, HttpStatus } from '@nestjs/common';

export class SobrenomeException extends HttpException {
  constructor() {
    super(
      'Não é permitido entrada de Bussolas no sistema',
      HttpStatus.FORBIDDEN,
    );
  }
}
