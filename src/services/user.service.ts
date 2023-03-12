import { FilterQuery, Types } from 'mongoose';
import { HttpException } from '../exceptions/HttpException';
import { IUser } from '../interface/user.interface';
import User from '../models/user.models';

export const GetUsers = async () => {
  return await User.find({ isDeleted: false }, '-__v -password -isDeleted');
};

export const GetUser = async (filter: FilterQuery<IUser>) => {
  try {
    return await User.findOne(
      { ...filter, isDeleted: false },
      '-__v -password -isDeleted',
    );
  } catch (error: any) {
    throw new HttpException(404, 'Could not find user');
  }
};

export const Login = async (input: Pick<IUser, 'email' | 'password'>) => {
  const { email, password } = input;

  const user = await User.findOne({ email, isDeleted: false });
  if (!user) throw new HttpException(404, `User with email ${email} not found`);

  if (!user.matchPassword(password)) {
    throw new HttpException(409, 'Invalid Password');
  }
  return user;
};

export const CreateUser = async (input: IUser) => {
  const { email, handle } = input;

  const userExists = await User.findOne({ email });

  if (userExists && !userExists?.isDeleted) {
    throw new HttpException(400, `User with email ${email} already exists`);
  }

  if (userExists?.handle == handle && !userExists?.isDeleted) {
    throw new HttpException(400, `User with handle ${handle} already exists`);
  }

  return await User.create(input);
};

export const UpdateUser = async (
  _id: Types.ObjectId,
  input: Partial<IUser>,
) => {
  const user = await User.findOne({ _id });

  if (!user) {
    throw new HttpException(404, 'User not found');
  }

  if (!user._id.equals(_id)) {
    throw new HttpException(403, 'Unauthorized request');
  }

  if (input.handle) {
    if (await User.findOne({ handle: input.handle })) {
      throw new HttpException(400, 'User with handle already exists');
    }
  }

  return await User.findByIdAndUpdate(_id, input, { new: true }).select(
    '-isDeleted -__v -password',
  );
};
