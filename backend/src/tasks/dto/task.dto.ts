import { IsString, IsNotEmpty, IsOptional, IsEnum, IsMongoId } from 'class-validator';
import { TaskStatus } from '../schemas/task.schema';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsMongoId()
  @IsNotEmpty()
  projectId: string;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
