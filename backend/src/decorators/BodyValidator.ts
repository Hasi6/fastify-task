/* eslint-disable no-unused-vars */
import { FastifyReply } from 'fastify';
import { z } from 'zod';

function bodyValidator(
  schema: z.SomeZodObject,
): (
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
      ...args: [request: Request, reply: FastifyReply]
    ) {
      try {
        schema.parse(args[0].body || {});
      } catch (err) {
        if (err instanceof z.ZodError) {
          return args[1]
            .status(400)
            .send({ success: false, errors: err.issues, data: null });
        }

        return args[1]
          .status(400)
          .send({ success: false, errors: [], data: null });
      }

      const output: object = await originalMethod.apply(this, args);
      return output;
    };

    return descriptor;
  };
}
export { bodyValidator as BodyValidator };
