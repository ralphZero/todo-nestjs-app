import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

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
}
