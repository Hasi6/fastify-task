/* eslint-disable no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';

import { UnauthorizedError } from '@utils/execptions';
import { ERROR_CODES } from '@utils/constants';
import { JWTService } from '@services/jwt';
import { UserService } from '@services/user';

function authGuard(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor {
  return function (
    _target: object,
    _functionName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: [request: FastifyRequest, reply: FastifyReply]
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const authorization = <string>args[0].headers.authorization;

      if (!authorization) {
        throw new UnauthorizedError(
          'Forbidden',
          [
            {
              code: ERROR_CODES.UNAUTHORIZED,
              path: ['bearer', 'authorization'],
              message: ERROR_CODES.INVALID_TOKEN,
            },
          ],
          403,
        );
      }

      const [_, token] = authorization.split('Bearer ');

      if (!token) {
        throw new UnauthorizedError(
          'Forbidden',
          [
            {
              code: ERROR_CODES.UNAUTHORIZED,
              path: ['bearer', 'authorization'],
              message: ERROR_CODES.INVALID_TOKEN,
            },
          ],
          403,
        );
      }

      const payload = await JWTService.verifyToken(token);
      if (!payload || !payload._id) {
        throw new UnauthorizedError(
          'Forbidden',
          [
            {
              code: ERROR_CODES.UNAUTHORIZED,
              path: ['bearer', 'authorization'],
              message: ERROR_CODES.INVALID_TOKEN,
            },
          ],
          403,
        );
      }

      const user = await UserService.findById(payload._id);
      if (!user) {
        throw new UnauthorizedError(
          'Forbidden',
          [
            {
              code: ERROR_CODES.UNAUTHORIZED,
              path: ['bearer', 'authorization'],
              message: ERROR_CODES.INVALID_TOKEN,
            },
          ],
          403,
        );
      }

      args[0].user = user;

      const output: object = await originalMethod.apply(this, args);
      return output;
    };

    return descriptor;
  };
}
export { authGuard as AuthGuard };
