import { ValidationPipe } from '@nestjs/common';

export class StrictValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      forbidNonWhitelisted: true,
    });
  }
}
