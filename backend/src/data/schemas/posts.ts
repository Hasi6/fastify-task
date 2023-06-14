import { InferModel, relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { reviews } from '@data/schemas';

export const posts = pgTable('posts', {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  id: uuid('id').primaryKey().defaultRandom(),
  image: varchar('image', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ many }) => ({
  reviews: many(reviews),
}));

export type Post = InferModel<typeof posts>;
