import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsDateString({}, { message: 'Invalid due date' })
  dueDate?: string;
}
