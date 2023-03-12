import { FilterQuery, Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { IPost } from '../interface/post.interface';
import Post from '../models/post.models';

export const GetPosts = async (filter?: FilterQuery<any>) => {
  return await Post.find({ ...filter }, '-__v -isDeleted -comments -body', {
    sort: 'asc',
  });
};

export const GetPost = async (_id: string) => {
  try {
    return await Post.findOne({ _id }, '-__v -isDeleted').populate(
      'comments',
      '-__v -isDeleted -post',
    );
  } catch (error: any) {
    throw new HttpException(404, 'Post not found');
  }
};

export const CreatePost = async (input: IPost) => {
  try {
    return await Post.create(input);
  } catch (error: any) {
    throw new HttpException(404, 'Post not found');
  }
};

export const UpdatePost = async (
  _id: string,
  userId: Types.ObjectId,
  input: Partial<IPost>,
) => {
  const post = await Post.findOne({ _id, isDeleted: false });

  if (!post) {
    throw new HttpException(404, 'post not found');
  }

  if (!post.author.equals(userId)) {
    throw new HttpException(403, 'Unauthorized request');
  }

  return await Post.findByIdAndUpdate(_id, input, { new: true });
};
