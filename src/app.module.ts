import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

@Module({
  // nest g --help   
  // nest g module tasks
  // nest g controller tasks --no-spec
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
