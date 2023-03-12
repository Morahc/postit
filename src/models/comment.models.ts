import { Schema, model, Model } from 'mongoose';
import { IComment } from '../interface/comment.interface';

type CommentModel = Model<IComment>;

export const commentSchema = new Schema<IComment, CommentModel>(
  {
    body: {
      type: String,
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

const Comment = model<IComment, CommentModel>('Comment', commentSchema);

export default Comment;
