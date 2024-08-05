import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const PORT = process.env.PORT || 3010;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser(process.env.SECRET_COOKIE));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: (requestOrigin, callback) => {
      callback(null, requestOrigin || '*');
    },
  });

  const securityScheme: SecuritySchemeObject = {
    description: `[Just text field] Please enter token in following format: Bearer <JWT>`,
    name: 'Authorization',
    bearerFormat: 'Bearer',
    scheme: 'Bearer',
    type: 'http',
    in: 'Header',
  };

  const config = new DocumentBuilder()
    .setTitle(`CabinID API.`)
    .setDescription(`API for CabinID Development Team.`)
    .setVersion('0.1')
    .addBearerAuth(securityScheme, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(PORT);
}
bootstrap();
