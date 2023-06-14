import { User } from '@data/user';

export {};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
