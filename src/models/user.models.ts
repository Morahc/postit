import bcrypt from 'bcrypt';
import { Schema, model, Model } from 'mongoose';
import { IUser, IUserMethods } from '../interface/user.interface';

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    avatar: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: [true, 'Fullname field is required'],
    },
    handle: {
      type: String,
      required: [true, 'Handle field is required'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
