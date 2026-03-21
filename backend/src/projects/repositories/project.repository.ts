import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schemas/project.schema';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(projectData: any): Promise<Project> {
    const newProject = new this.projectModel(projectData);
    return newProject.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }
}
