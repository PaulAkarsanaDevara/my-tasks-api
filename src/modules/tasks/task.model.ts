import { Schema, model, Types } from 'mongoose';

export interface ITask extends Document {
  userId: object;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  completedAt: Date;
  isArchived: boolean;
}

const TaskSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      index: true,
    },
    completedAt: {
      type: Date,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

export const TaskModel = model('Task', TaskSchema);
