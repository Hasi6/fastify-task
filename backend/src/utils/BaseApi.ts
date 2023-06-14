import { FastifyInstance } from 'fastify';

export default abstract class BaseApi {
  protected router: FastifyInstance;

  protected constructor(router: FastifyInstance) {
    this.router = router;
  }

  public abstract register(): void;
}
