import { z } from 'zod';

export const postAttributes = z.object({
  createdAt: z.string(),
  description: z.string(),
  id: z.string(),
  average_rate: z.string(),
  image: z.string(),
  title: z.string(),
  updatedAt: z.string(),
});

export type PostZ = z.infer<typeof postAttributes>;
