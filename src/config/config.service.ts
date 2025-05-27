import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.nestConfigService.get<string>('DB_HOST'),
      port: this.nestConfigService.get<number>('DB_PORT'),
      username: this.nestConfigService.get<string>('DB_USER'),
      password: this.nestConfigService.get<string>('DB_PASSWORD'),
      database: this.nestConfigService.get<string>('DB_NAME'),
      synchronize: this.nestConfigService.get<boolean>('DB_SYNC', false),
      logging: this.nestConfigService.get<boolean>('DB_LOGGING', false),
    };
  }

  getAppConfig() {
    return {
      port: this.nestConfigService.get<number>('APP_PORT') || 3000,
      env: this.nestConfigService.get<string>('NODE_ENV') || 'development',
    };
  }
}
