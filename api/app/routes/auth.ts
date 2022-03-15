import { Router } from 'express';
import { signup, signin, getCurrentUser, signout } from '../controllers/auth';
import { requireSignin } from '../middleware';
import { areValidAuthInputs } from '../validators/auth';

let router: Router = Router();

router.post('/auth/signup', areValidAuthInputs, signup);
router.post('/auth/signin', areValidAuthInputs, signin);
router.get('/auth/current', requireSignin, getCurrentUser);
router.get('/auth/signout', signout);

export default router;
