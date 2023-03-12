import { Router } from 'express';
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import {
  getAllComments,
  getSingleComment,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller';
import { isAuth } from '../middlewares/auth.middleware';
import validate from '../middlewares/validate.middleware';
import { createSchema, updateSchema } from '../schema/post.schema';
import { schema } from '../schema/comment.schema';

const router = Router();

router.get('/', getAllPosts);

router.get('/:id', getSinglePost);

router.post('/', validate(createSchema), isAuth, createPost);

router.patch('/:id', validate(updateSchema), isAuth, updatePost);

router.delete('/:id', isAuth, deletePost);

router.get('/:postId/comments', getAllComments);

router.get('/:postId/comments/:commentId', getSingleComment);

router.post('/:postId/comments', validate(schema), isAuth, createComment);

router.patch(
  '/:postId/comments/:commentId',
  validate(schema),
  isAuth,
  updateComment,
);

router.delete('/:postId/comments/:commentId', isAuth, deleteComment);

export default router;
