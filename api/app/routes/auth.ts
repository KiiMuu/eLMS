import { Router } from 'express';
import {
	signup,
	signin,
	getCurrentUser,
	forgotPassword,
	resetPassword,
	signout,
} from '../controllers/auth';
import { requireSignin } from '../middleware';
import {
	areValidAuthInputs,
	validateResetPasswordFields,
} from '../validators/auth';

let router: Router = Router();

router.post('/auth/signup', areValidAuthInputs, signup);
router.post('/auth/signin', areValidAuthInputs, signin);
router.get('/auth/current', requireSignin, getCurrentUser);
router.post('/password/forgot', forgotPassword);
router.post('/password/reset', validateResetPasswordFields, resetPassword);
router.get('/auth/signout', signout);

export default router;
