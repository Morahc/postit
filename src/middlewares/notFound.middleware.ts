import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next(new HttpException(404, 'Not Found'))
};

export default notFound;
