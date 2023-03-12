import { Router } from 'express';
import { getUserPosts } from '../controllers/post.controller';
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from '../controllers/user.controller';
import { isAuth } from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { updateSchema } from '../schema/user.schema';

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', getSingleUser);

router.get('/:id/posts', getUserPosts);

router.patch('/update', isAuth, validate(updateSchema), updateUser);

router.delete('/delete', isAuth, deleteUser);

export default router;
