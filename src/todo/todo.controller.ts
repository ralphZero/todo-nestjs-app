import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos(@Res() res) {
    try {
      const docs = await this.todoService.getTodosFromFirestore();
      return { data: docs, error: null };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Get(':username')
  async getTodoByUser(@Param('username') username: string) {
    try {
      const todos = await this.todoService.getTodoByUserFromFirestore(username);
      if (todos.length) return todos;
      else throw new NotFoundException();
    } catch (err) {
      throw new HttpException({ err }, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createTodo(@Body() todo: CreateTodoDto) {
    try {
      this.todoService.createTodo(todo);
      return { code: HttpStatus.CREATED, message: 'Task created successfully' };
    } catch (err) {
      throw new HttpException({ err }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':username')
  updateTodo(@Param('username') username: string, @Query('id') id: string) {
    return {};
  }
}
