import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import User from '../models/user.models';
import { verifyToken } from '../util/jwt.util';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

  if (!token) {
    next(new HttpException(404, 'Authentication token missing'));
  } else {
    const { decoded, expired } = verifyToken(token);

    if (expired) {
      next(new HttpException(404, 'Expired token, Unauthorized user'));
    }
    const user = await User.findById(decoded?._id);

    if (!user) {
      next(new HttpException(404, 'User not Found, Unauthorized user'));
    }
    req.user = { _id: user?._id, handle: user?.handle };
    next();
  }
};
