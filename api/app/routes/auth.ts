import { Router } from 'express';
import { signup, signin, signout } from '../controllers/auth';
import { areValidAuthInputs } from '../validators/auth';

let router: Router = Router();

router.post('/auth/signup', areValidAuthInputs, signup);
router.post('/auth/signin', areValidAuthInputs, signin);
router.get('/auth/signout', signout);

export default router;
