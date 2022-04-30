import { Router } from 'express';
import {
	becomeInstructor,
	getAccountStatus,
	getCurrentInstructor,
} from '../controllers/instructor';
import { requireSignin } from '../middleware';

let router: Router = Router();

router.post('/instructor/become-instructor', requireSignin, becomeInstructor);
router.get('/instructor/account-status', requireSignin, getAccountStatus);
router.get('/instructor/current', requireSignin, getCurrentInstructor);

export default router;
