import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  // npm run start
  // nest g --help   
  // nest g module tasks
  // nest g controller tasks --no-spec
  // nest g service tasks --no-spec
  // npm add class-validator class-transformer
  // npm add typeorm @nestjs/typeorm pg

  const app = await NestFactory.create(AppModule);
  // creating new nestjs app using appmodule
  app.useGlobalPipes(new ValidationPipe())     // validation config
  await app.listen(3000);
  // calling listen method on port 3000
}
bootstrap();


// Docker
// docker run --name postgres-nest -p 5431:5431 -e POSTGRES_PASSWORD=postgres -d postgres
// docker container rm postgres-nest => rempove
// docker container stop postgres-nest => stop
// docker container start postgres-nest
// docker ps
// docker inspect [pase id]
// "C:\Program Files\Docker\Docker\DockerCli.exe" SwitchDaemon

// ORM=>Object-relational-mapping (ORM) is a technique that lets you query
// and manipulate data from a database, using an object-oriented paradigma.

// ORM helps to allow developers to communicate to the db using their preferred
// programming language rather than sending plain queries directly