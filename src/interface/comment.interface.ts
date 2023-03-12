import { Types } from 'mongoose';

export interface IComment {
  post: Types.ObjectId;
  body: string;
  author: Types.ObjectId;
  isDeleted: boolean;
}
