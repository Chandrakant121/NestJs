import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // creating new nestjs app using appmodule
  await app.listen(3000);
  // calling listen method on port 3000
}
bootstrap();
