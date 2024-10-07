import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';
import { envs } from './config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted:true
    })
  )

  app.useGlobalFilters(new RpcCustomExceptionFilter())

  app.setGlobalPrefix('api')
  app.use(cookieParser());


  await app.listen(envs.PORT);
} 
bootstrap();
