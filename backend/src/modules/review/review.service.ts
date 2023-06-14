import { db } from '@data/index';
import { reviews } from '@data/schemas';
import { eq } from 'drizzle-orm';
import { ReviewSchemaZ } from './review.dto';

export class ReviewService {
  public async reviewsByPostId(postId: string) {
    return db.select().from(reviews).where(eq(reviews.postId, postId));
  }

  public async addReview(body: ReviewSchemaZ) {
    const review = db.insert(reviews).values(body).returning();
    return review;
  }
}
