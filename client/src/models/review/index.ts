import { z } from 'zod';

export const reviewAttributes = z.object({
  createdAt: z.string(),
  id: z.string(),
  rate: z.number(),
  text: z.string(),
  updatedAt: z.string(),
});

export type ReviewZ = z.infer<typeof reviewAttributes>;
