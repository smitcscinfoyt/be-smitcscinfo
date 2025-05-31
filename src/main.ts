import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { LanguageMiddleware } from './common/middleware/language.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/interceptors/exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(new LanguageMiddleware().use.bind(new LanguageMiddleware()));

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Set up Swagger
  const config = new DocumentBuilder()
    .setTitle('Smit CSC Info')
    .setDescription('API documentation for the smitcscinfo backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Apply global error/exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  SwaggerModule.setup('api', app, document);

  const PORT = configService.getAppConfig().port;
  await app.listen(PORT);
}
void bootstrap();
