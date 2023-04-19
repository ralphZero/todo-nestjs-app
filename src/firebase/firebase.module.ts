import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../../project-key.json');

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useValue: admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      }),
    },
  ],

  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
