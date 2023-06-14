import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { validate } from 'uuid';

import BaseApi from '@utils/BaseApi';
import { ResponseBuilder } from '@utils/ResponseBuilder';
import { ReviewService } from '@modules/review/review.service';
import { BadRequestError } from '@utils/execptions';
import { ERROR_CODES } from '@utils/constants';
import { BodyValidator } from '@decorators/BodyValidator';
import { reviewSchemaz, ReviewSchemaZ } from '@modules/review/review.dto';

export class ReviewController extends BaseApi {
  private reviewService: ReviewService;
  constructor(server: FastifyInstance) {
    super(server);

    this.reviewService = new ReviewService();
    this.register();
  }

  public register(): void {
    this.router.get(
      '/api/v1/reviews/post/:id',
      this.reviewsByPostId.bind(this),
    );
    this.router.post('/api/v1/reviews', this.addReview.bind(this));
  }

  public async reviewsByPostId(_req: FastifyRequest, _res: FastifyReply) {
    const { id } = <{ id: string }>_req.params;

    if (!validate(id)) {
      throw new BadRequestError(ERROR_CODES.INVALID_ID, { id });
    }
    const data = await this.reviewService.reviewsByPostId(id);
    return ResponseBuilder.successResponse(data);
  }

  @BodyValidator(reviewSchemaz)
  public async addReview(_req: FastifyRequest, _res: FastifyReply) {
    const body = <ReviewSchemaZ>_req.body;

    const data = await this.reviewService.addReview(body);
    return ResponseBuilder.successResponse(data);
  }
}
