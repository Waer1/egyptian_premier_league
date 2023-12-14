import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // use validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // set global prefix
  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('EPL API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  // enable cors
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: '*',
    credentials: true,
  });

  const PORT = process.env.APP_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
