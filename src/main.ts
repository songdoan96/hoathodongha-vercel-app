import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL
        : [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://172.17.0.200:3000',
            'http://192.168.1.200:3000',
          ],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 8888, () =>
    console.log(`Server running at http://localhost:${process.env.PORT}`),
  );
}
bootstrap();
