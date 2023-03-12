import { Request, Response, Router } from 'express';
import auth from './auth.route';
import user from './user.route';

const router = Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server ok' });
});

router.use('/auth', auth);

router.use('/users', user);

export default router;
