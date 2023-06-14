import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

import BaseApi from '@utils/BaseApi';
import { ResponseBuilder } from '@utils/ResponseBuilder';
import { PostService } from '@modules/post/post.service';
import { Query } from '@utils/query';

export class PostController extends BaseApi {
  private postService: PostService;
  constructor(server: FastifyInstance) {
    super(server);

    this.postService = new PostService();
    this.register();
  }

  public register(): void {
    this.router.get('/api/v1/posts', this.all.bind(this));
  }

  public async all(_req: FastifyRequest, _res: FastifyReply) {
    const data = await this.postService.all(<Query>_req.query);
    return ResponseBuilder.successResponse(data);
  }
}
