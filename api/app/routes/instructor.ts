import { Router } from 'express';
import { becomeInstructor, getAccountStatus } from '../controllers/instructor';
import { requireSignin } from '../middleware';

let router: Router = Router();

router.post('/user/become-instructor', requireSignin, becomeInstructor);
router.get('/user/account-status', requireSignin, getAccountStatus);

export default router;
