import { Request, Response, Router } from 'express';
import auth from './auth.route';
import user from './user.route';
import post from './post.route';

const router = Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server ok' });
});

router.get('/docs', (req: Request, res: Response) => {
  res.redirect('https://documenter.getpostman.com/view/26151840/2s93JtQixJ');
});

router.use('/auth', auth);

router.use('/posts', post);

router.use('/users', user);

export default router;
