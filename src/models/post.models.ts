import { Schema, model, Model } from 'mongoose';
import { IPost } from '../interface/post.interface';

type PostModel = Model<IPost>;

export const postSchema = new Schema<IPost, PostModel>(
  {
    title: {
      type: String,
      required: [true, 'Fullname field is required'],
    },
    body: {
      type: String,
      required: [true, 'Handle field is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
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

postSchema.pre('find', function () {
  this.where({ isDeleted: false });
});

const Post = model<IPost, PostModel>('Post', postSchema);

export default Post;
