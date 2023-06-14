import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export const errorHandler = (
  _err: FastifyError,
  _req: FastifyRequest,
  _res: FastifyReply
) => {
  const statusCode = _err.statusCode || 500;
  return _res.status(statusCode).send({
    success: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errors: _err?.data || _err?.message,
    data: null,
    statusCode,
  });
};
