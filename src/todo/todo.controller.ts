import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Todo } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos(@Res() res) {
    try {
      const docs = await this.todoService.getTodosFromFirestore();
      res.status(200).json({ data: docs, error: null });
    } catch (e) {
      res.status().json({ error: 'err' });
    }
  }

  @Get(':username')
  getTodoByUser(@Param('username') username: string) {
    return { username };
  }

  @Post()
  createTodo(@Body() todo: Todo) {
    todo.id = new Date().getTime().toString();
    return { todo };
  }

  @Patch(':username')
  updateTodo(@Param('username') username: string, @Query('id') id: string) {
    return {};
  }
}
