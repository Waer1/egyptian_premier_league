import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable cors
  app.enableCors({
    origin: '*',
  });

  // use validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // set global prefix
  app.setGlobalPrefix('api/v1');


  await app.listen(3000);
}
bootstrap();
