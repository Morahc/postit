import { Request, Response, NextFunction } from 'express';
import * as services from '../services/comment.service';

export const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.params;
    const comments = await services.GetComments({ post: postId });

    res.json({ data: comments, success: true });
  } catch (error) {
    next(error);
  }
};

export const getSingleComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await services.GetComment(req.params.commentId);

    res.json({ data: comment, success: true });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await services.CreateComment({
      ...req.body,
      author: req.user?._id,
      post: req.params.postId,
    });

    res.status(201).json({
      success: true,
      message: 'Comment successfully created',
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const comment = await services.UpdateComment(
      req.params.commentId,
      req.user?._id,
      req.body,
    );

    res.json({
      data: comment,
      message: 'Comment successfully updated',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await services.UpdateComment(req.params.commentId, req.user?._id, {
      isDeleted: true,
    });

    res.json({ message: 'Comment has been deleted', success: true });
  } catch (error) {
    next(error);
  }
};
