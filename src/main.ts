import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from "@nestjs/common/enums/version-type.enum";
import { VERSION_NEUTRAL } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    type: VersioningType.URI,
  });

  // Swagger
  const options = new DocumentBuilder()
      .setTitle('build-a-path API')
      .setDescription('...')
      .setVersion('1.1.0')
      .addTag('v1')
      .setContact('Domenico Caruso', 'https://www.build-a-path.com', 'contact [at] build-a-path.com')
      .addBearerAuth(); // optional if any route has bearer authentication

  const doc = options.build();

  const document = SwaggerModule.createDocument(app, doc);
  SwaggerModule.setup('/api/', app, document);

  await app.listen(3000);
}

bootstrap();
