/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

declare global {
  let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
}

export {};
