import { Router } from 'express';
import { signup } from '../controllers/auth';
import { areValidSignupInputs } from '../validators/auth';

let router: Router = Router();

router.post('/auth/signup', areValidSignupInputs, signup);

export default router;
