export class ResponseBuilder {
  public static successResponse(data: object, meta?: object) {
    return {
      sucess: true,
      data,
      errors: [],
      meta,
    };
  }
}
