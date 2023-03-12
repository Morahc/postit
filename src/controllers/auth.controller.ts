import { Request, Response, NextFunction } from 'express';
import * as services from '../services/user.service';
import { generateRandomAvatar } from '../util/avatar.util';
import { generateToken } from '../util/jwt.util';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const avatar = await generateRandomAvatar(req.body.email);

    await services.CreateUser({ ...req.body, avatar });

    res.status(201).json({ message: 'User created', success: true });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = await services.Login(req.body);

    const token = generateToken({ _id }, { expiresIn: '5d' });

    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};
