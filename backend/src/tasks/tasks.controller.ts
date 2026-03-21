import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('projectId') projectId: string) {
    if (projectId) {
      return this.taskService.findByProject(projectId);
    }
    // Return all tasks if no projectId is provided
    return [];
  }

  @Patch(':id/complete')
  completeTask(@Param('id') id: string) {
    return this.taskService.completeTask(id);
  }
}
