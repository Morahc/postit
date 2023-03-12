export interface IUser {
  avatar: string;
  fullname: string;
  handle: string;
  email: string;
  password: string;
  isDeleted: boolean;
}

export interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
}
