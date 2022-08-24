import Router from 'express';

import controller from '../controllers/auth.controller.js';

const router = new Router();

router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);
router.put('/refresh-token', controller.updatehToken);
router.delete('/delete-token', controller.deleteToken);

export default router;
