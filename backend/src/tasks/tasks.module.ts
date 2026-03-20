import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './tasks.service';
import { TaskController } from './tasks.controller';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository],
})
export class TasksModule {}
