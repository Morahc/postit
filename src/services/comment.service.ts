import { FilterQuery, Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { IComment } from '../interface/comment.interface';
import Comment from '../models/comment.models';
import Post from '../models/post.models';

export const GetComments = async (filter: FilterQuery<any>) => {
  return await Comment.find({ ...filter }, '-__v -isDeleted -post');
};

export const GetComment = async (_id: string) => {
  try {
    return await Comment.findOne({ _id });
  } catch (error: any) {
    throw new HttpException(404, 'Comment not found');
  }
};

export const CreateComment = async (input: IComment) => {
  try {
    const post = await Post.findOne({ author: input.author });
    const comment = await Comment.create(input);
    post?.comments.push(comment._id);
    await post?.save();

    return comment;
  } catch (error: any) {
    console.log(error);
    throw new HttpException(404, 'Comment could not be created');
  }
};

export const UpdateComment = async (
  commentId: string,
  userId: Types.ObjectId,
  input: Partial<IComment>,
) => {
  const comment = await Comment.findOne({ _id: commentId, isDeleted: false });

  if (!comment) {
    throw new HttpException(404, 'Comment not found');
  }

  if (!comment.author.equals(userId)) {
    throw new HttpException(403, 'Unauthorized request');
  }

  return await Comment.findByIdAndUpdate(commentId, input, {
    new: true,
  });
};
