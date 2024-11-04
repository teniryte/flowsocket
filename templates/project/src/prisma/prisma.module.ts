import { AppModule, Module } from 'flowsocket';
import { PrismaService } from './prisma.service';

@AppModule({
  services: [PrismaService],
})
export class PrismaModule extends Module {}
