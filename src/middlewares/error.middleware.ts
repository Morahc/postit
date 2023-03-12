import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    message,
    success: false
  });
};

export default errorHandler;
