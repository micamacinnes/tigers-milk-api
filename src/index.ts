import {TigersMilkApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {TigersMilkApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new TigersMilkApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
