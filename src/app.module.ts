import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { TranslationService } from './common/services/translation.service';
import { RolesModule } from './modules/roles/roles.module';
import * as path from 'path';
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(process.cwd(), 'i18n'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [new AcceptLanguageResolver(), new QueryResolver(['lang'])],
    }),
    AuthModule,
    ConfigModule,
    DatabaseModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, TranslationService],
})
export class AppModule {}
