import { AppService, Service } from 'flowsocket';

import { PrismaClient } from '@prisma/client';

@AppService()
export class PrismaService extends Service {
  client = new PrismaClient();
}
