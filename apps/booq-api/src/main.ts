import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';
import { Logger } from 'nestjs-pino';
import { GlobalExceptionFilter } from './config/global-exception.filter';

const meta = {
  title: 'ConvoFlow API',
  description: 'API documentation for ConvoFlow',
};

const { VERSION, PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const port = Number(PORT) || 3000;

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useLogger(app.get(Logger));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  patchNestjsSwagger();
  const config = new DocumentBuilder()
    .setTitle(meta.title)
    .setDescription(meta.description)
    .setVersion(VERSION || '1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

bootstrap();
