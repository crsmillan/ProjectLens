import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id/complete')
  completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }
}
