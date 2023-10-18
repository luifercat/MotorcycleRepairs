export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode; //ese statusCode se envia por el constructor
    this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
