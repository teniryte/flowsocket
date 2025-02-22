import { Application } from './application.class';

export class LocalStorage {
  constructor(private readonly application: Application) {}

  set(name: string, value: string) {
    this.application.setLocal(name, value);
  }

  remove(name: string) {
    this.application.removeLocal(name);
  }

  async get(name: string) {
    return await this.application.getLocal(name);
  }
}
