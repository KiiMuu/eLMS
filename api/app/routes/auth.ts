import { Router } from 'express';
import { signup } from '../controllers/auth';

let router: Router = Router();

router.post('/auth/signup', signup);

export default router;
