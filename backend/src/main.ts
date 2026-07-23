import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `${process.env.UI_HOST}:${process.env.UI_PORT}`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(process.env.PORT ?? 8000, process.env.HOST ?? '0.0.0.0');
}
bootstrap();
