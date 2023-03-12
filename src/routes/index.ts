import { Request, Response, Router } from 'express';
import auth from './auth.route';

const router = Router();

router.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server ok' });
});

router.use('/auth', auth);

export default router;
