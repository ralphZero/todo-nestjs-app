import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Todo } from './dto/todo.dto';

@Controller('todo')
export class TodoController {
  @Get()
  getAllTodos() {
    return [];
  }

  @Get(':username')
  getTodoByUser(@Param('username') username: string) {
    return { username };
  }

  @Post()
  createTodo(@Body() todo: Todo) {
    return {};
  }

  @Patch(':username')
  updateTodo(@Param('username') username: string, @Query('id') id: string) {
    return {};
  }
}
