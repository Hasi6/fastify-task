export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
    data?: object;
  }[];
}

export class DatabaseConnectionError extends CustomError {
  message = 'Error connecting to database';
  statusCode = 500;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  // eslint-disable-next-line no-unused-vars
  constructor(public message: string, public data: object | null) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
        data: this.data || {},
      },
    ];
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor(
    public message: string,
    // eslint-disable-next-line no-unused-vars
    public data: object | null,
    status?: number
  ) {
    super(message);
    this.statusCode = status || this.statusCode;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
        data: this.data || {},
      },
    ];
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;
  message = 'Route Not Found';
  constructor(message?: string) {
    super(message || '');
    this.message = message || this.message;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}

export class TooManyRequests extends CustomError {
  statusCode = 429;
  message = 'Too Many Requests';
  constructor(message?: string) {
    super(message || '');
    this.message = message || this.message;
    Object.setPrototypeOf(this, TooManyRequests.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
