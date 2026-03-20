import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(taskData: any): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    return this.taskModel.find({ projectId }).exec();
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateData: any): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }
}
