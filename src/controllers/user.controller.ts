import { Request, Response, NextFunction } from 'express';
import * as services from '../services/user.service';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await services.GetUsers();

    res.json({ data: user, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter = req.params.id.startsWith('@')
    ? { handle: req.params.id }
    : { _id: req.params.id };
  try {
    const user = await services.GetUser(filter);

    res.json({ data: user, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await services.UpdateUser(req.user?._id, req.body);

    res.json({
      data: user,
      message: 'User successfully updated',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await services.UpdateUser(req.user?._id, { isDeleted: true });

    res.json({ message: 'User has been deleted', success: true });
  } catch (error) {
    next(error);
  }
};
