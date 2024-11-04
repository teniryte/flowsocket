import { App } from 'flowsocket';
import { resolve } from 'path';
import { Application } from 'flowsocket/dist/classes/application.class';

import dotenv from 'dotenv';
import { PrismaModule } from './prisma/prisma.module';

dotenv.config({ path: resolve(__dirname, '../.env') });

@App({
  host: process.env.HOST || '0.0.0.0',
  port: +process.env.PORT! || 8080,
  path: resolve(__dirname, '..'),
  modules: [PrismaModule],
})
export class {{appClass}} extends Application {}
