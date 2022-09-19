import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import authRouter from './authRouter';
import testsRouter from './testsRouter';

const router = Router();
router.use(authRouter);
router.use(ensureAuthenticatedMiddleware);
router.use(testsRouter);

export default router;
