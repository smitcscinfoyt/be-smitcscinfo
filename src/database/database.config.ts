import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '../config/config.service';
import * as dotenv from 'dotenv';

// Load environment variables once for CLI use
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function buildConfig(config: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl: boolean | { rejectUnauthorized: boolean };
  synchronize: boolean;
  logging: boolean;
}): DataSourceOptions {
  return {
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    ssl: config.ssl,
    synchronize: config.synchronize,
    logging: config.logging,
    migrationsTableName: 'migrations',
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/**/*.entity.js'],
  };
}

export const getDatabaseConfig = (
  configService?: ConfigService,
): DataSourceOptions => {
  if (configService) {
    const db = configService.getDatabaseConfig();

    // Validate values from ConfigService
    const required = <T>(value: T | undefined, name: string): T => {
      if (value === undefined || value === null) {
        throw new Error(`Missing required config value: ${name}`);
      }
      return value;
    };

    return buildConfig({
      host: required(db.host, 'DB_HOST (configService)'),
      port: required(db.port, 'DB_PORT (configService)'),
      username: required(db.username, 'DB_USER (configService)'),
      password: required(db.password, 'DB_PASSWORD (configService)'),
      database: required(db.database, 'DB_NAME (configService)'),
      ssl:
        required(db.ssl, 'DB_SSL (configService)') === true
          ? { rejectUnauthorized: false }
          : false,
      synchronize: required(db.synchronize, 'DB_SYNC (configService)'),
      logging: required(db.logging, 'DB_LOGGING (configService)'),
    });
  }

  return buildConfig({
    host: requireEnv('DB_HOST'),
    port: Number(requireEnv('DB_PORT')),
    username: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
    database: requireEnv('DB_NAME'),
    ssl: requireEnv('DB_SSL') === 'true',
    synchronize: requireEnv('DB_SYNC') === 'true',
    logging: requireEnv('DB_LOGGING') === 'true',
  });
};

export const databaseConfig: DataSourceOptions = getDatabaseConfig();

export const databaseConfigFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => getDatabaseConfig(configService);

export const dataSource = new DataSource(databaseConfig);
