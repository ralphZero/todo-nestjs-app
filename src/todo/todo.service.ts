import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './types/Todo';
import { log } from 'console';

@Injectable()
export class TodoService {
  private firestore: admin.firestore.Firestore;
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseAdmin: admin.app.App,
  ) {
    this.firestore = this.firebaseAdmin.firestore();
  }

  async getTodosFromFirestore() {
    const collection = await this.firestore.collection('todo').get();
    return collection.docs;
  }

  async getTodoByUserFromFirestore(username: string) {
    const querySnapshot = await this.firestore
      .collection('todo')
      .where('username', '==', username)
      .get();
    const todos: Todo[] = querySnapshot.docs.map((todo) => todo.data() as Todo);
    return todos;
  }

  async createTodo(todo: CreateTodoDto) {
    todo.id = new Date().getTime().toString();
    todo.status = false;
    await this.firestore.collection('todo').add(todo);
    return;
  }
}
