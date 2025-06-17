class ErrorHandler extends Error {
  public statusCode: number = 500;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export { ErrorHandler };
