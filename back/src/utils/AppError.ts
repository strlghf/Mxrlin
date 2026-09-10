export class AppError extends Error {
  statusCode: number;
  
  constructor(error: string, statusCode = 400) {
    super(error);
    this.statusCode = statusCode;
  }
}