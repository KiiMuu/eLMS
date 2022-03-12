import { Router } from 'express';
import { signup, signin } from '../controllers/auth';
import { areValidAuthInputs } from '../validators/auth';

let router: Router = Router();

router.post('/auth/signup', areValidAuthInputs, signup);
router.post('/auth/signin', areValidAuthInputs, signin);

export default router;
