import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createLogger, transports, format } from 'winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [new transports.Console()],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Locations API')
    .setDescription('A simple RESTful API to manage locations with a tree structure')
    .setVersion('1.0')
    .addTag('locations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();