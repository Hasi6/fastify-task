import { z } from 'zod';

export const reviewSchemaz = z.object({
  postId: z.string().uuid(),
  rate: z.number(),
  text: z.string(),
});

export type ReviewSchemaZ = z.infer<typeof reviewSchemaz>;
