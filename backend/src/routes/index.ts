import { FastifyInstance } from 'fastify';

import { PostController } from '@modules/post';
import { ReviewController } from '@modules/review';

export async function registerRoutes(server: FastifyInstance) {
  new PostController(server);
  new ReviewController(server);
}
