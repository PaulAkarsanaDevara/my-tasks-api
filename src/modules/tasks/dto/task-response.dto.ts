export class TaskResponseDto {
  id!: string;
  title!: string;
  description?: string;
  status!: string;
  priority!: string;
  dueDate?: Date;
  createdAt!: Date;
}
