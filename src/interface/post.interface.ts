import { Types } from 'mongoose';

export interface IPost {
  title: string;
  body: string;
  author: Types.ObjectId;
  comments: [Types.ObjectId];
  isDeleted: boolean;
}
