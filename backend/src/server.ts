/* istanbul ignore file */
/* eslint-disable @typescript-eslint/ban-ts-comment */
require('dotenv').config({ path: '.env' });
require('module-alias/register');
import fastify, { FastifyRequest } from 'fastify';
import { v4 as uuid, validate } from 'uuid';
import cors from 'cors';
import logger from 'morgan';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { registerRoutes } from '@routes/index';
import { NotFoundError } from '@utils/execptions';
import { errorHandler } from '@middlewares/error-handler';
import { db } from '@data/index';

const app = fastify({
  logger: false,
  genReqId: (_req: FastifyRequest) => {
    if (!validate(_req.id)) {
      return uuid();
    }
    return _req.id;
  },
});

export async function boostrap(isTest?: boolean) {
  await app.register(require('@fastify/middie'), {
    hook: 'onRequest',
  });
  await registerRoutes(app);

  if (!isTest) {
    // @ts-ignore
    app.use(logger('dev'));
    // @ts-ignore
    app.use(
      cors({
        origin: '*',
      }),
    );
  }

  if (isTest) {
    app.get('/server-error', () => {
      throw new Error('Error for Testing');
    });
  }

  app.all('*', async () => {
    throw new NotFoundError();
  });

  app.setErrorHandler(errorHandler);

  const PORT = isTest
    ? 5005
    : process.env.PORT // eslint-disable-next-line indent
    ? parseInt(process.env.PORT) // eslint-disable-next-line indent
    : 5000;

  app.listen({ port: PORT }, async (err, address) => {
    await migrate(db, {
      migrationsFolder: './migrations',
    });
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`app listening at ${address}`);
  });
  return app;
}

export { app };
