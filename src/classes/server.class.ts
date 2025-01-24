import { Server, DefaultEventsMap, Socket } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { SocketEventCallback } from '../types/socket-event-callback.type';

export class CServer {
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  httpServer: HttpServer;
  sockets: Socket[];
  events: { [key: string]: SocketEventCallback[] } = {};

  initSocketEvents() {
    this.io.on('connection', (socket) => {
      this.sockets.push(socket);
      Object.keys(this.events).forEach((eventName) => {
        socket.on(eventName, async (...args: any) => {
          const cb = args.pop();
          const results: any[] = await Promise.all(
            this.events[eventName].map((cb) => cb(...args)),
          );
          cb(results[0]);
        });
      });
    });
  }

  constructor(private readonly host: string, private readonly port: number) {
    this.httpServer = createServer();
    this.io = new Server(this.httpServer, {
      transports: ["websocket"],
      cors: {
        origin: '*',
      },
    });

    this.sockets = [];
  }

  start() {
    this.initSocketEvents();

    this.httpServer.listen(this.port, this.host);
  }

  on(eventName: string, cb: SocketEventCallback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(cb);
  }

  emit(eventName: string, ...args: any[]) {
    this.io.emit(eventName, ...args);
  }
}
