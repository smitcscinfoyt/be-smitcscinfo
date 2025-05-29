import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigFactory } from './database.config';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfigFactory,
    }),
  ],
})
export class DatabaseModule {
  private readonly logger = new Logger(DatabaseModule.name);

  onModuleInit() {
    this.logger.log('✅ Postgress Database connected successfully (NestJS)');
  }
}
