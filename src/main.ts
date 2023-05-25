import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // npm run start
  // nest g --help   
  // nest g module tasks
  // nest g controller tasks --no-spec
  // nest g service tasks --no-spec

  const app = await NestFactory.create(AppModule);
  // creating new nestjs app using appmodule
  await app.listen(3000);
  // calling listen method on port 3000
}
bootstrap();
