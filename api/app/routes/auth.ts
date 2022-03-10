import { Router } from 'express';
import { signup } from '../controllers/auth';

let router: Router = Router();

router.get('/signup', signup);

export default router;
