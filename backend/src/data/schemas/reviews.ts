import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { posts } from '@data/schemas';

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  text: text('text'),
  rate: integer('rate'),
  postId: uuid('post_id').references(() => posts.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  post: one(posts, {
    fields: [reviews.postId],
    references: [posts.id],
  }),
}));
