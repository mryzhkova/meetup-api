import Router from 'express';

import controller from '../controllers/meetup.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import authorizMiddleware from '../middlewares/authorizMiddleware.js';

const router = new Router();

router.use('/meetup', authMiddleware);
router.use('/meetups', authMiddleware);

router.post('/meetup', authorizMiddleware(), controller.createMeetup);
router.get('/meetups', controller.getMeetups);
router.get('/meetup/:id', controller.getMeetup);
router.put('/meetup/:id', authorizMiddleware(), controller.updateMeetup);
router.delete('/meetup/:id', authorizMiddleware(), controller.deleteMeetup);
router.post('/meetup/:id/visit', controller.addMeetupVisitor);
router.get('/meetup/:id/visitors', controller.getMeetupVisitors);

export default router;
