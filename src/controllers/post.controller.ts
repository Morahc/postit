import { Request, Response, NextFunction } from 'express';
import * as services from '../services/post.service';

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await services.GetPosts();
    res.json({ data: posts, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await services.GetPost(req.params.id);

    res.json({ data: post, success: true });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const filter = req.params.id.startsWith('@')
  //   ? { handle: req.params.id }
  //   : { _id: req.params.id };
  try {
    const post = await services.GetPosts({ author: { _id: req.params.id } });

    res.json({ data: post, success: true });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await services.CreatePost({
      ...req.body,
      author: req.user?._id,
    });

    res.json({
      data: post,
      message: 'Post successfully created',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await services.UpdatePost(
      req.params.id,
      req.user?._id,
      req.body,
    );

    res.status(200).json({
      data: user,
      message: 'Post successfully updated',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await services.UpdatePost(req.params.id, req.user?._id, {
      isDeleted: true,
    });

    res.json({ message: 'Post has been deleted', success: true });
  } catch (error) {
    next(error);
  }
};
