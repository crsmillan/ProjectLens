import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Project', required: true })
  projectId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  completedAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
