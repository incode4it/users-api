import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv  from 'dotenv';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // const result = dotenv.config();
  // Logger.log(result);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
