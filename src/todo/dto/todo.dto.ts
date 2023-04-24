import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  id?: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  task: string;
  status: boolean;
}
