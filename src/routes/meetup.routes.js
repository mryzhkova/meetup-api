import Router from 'express';

import controller from '../controllers/meetup.controller.js';

const router = new Router();

router.post('/meetup', controller.createMeetup);
router.get('/meetups', controller.getMeetups);
router.get('/meetup/:id', controller.getMeetup);
router.put('/meetup/:id', controller.updateMeetup);
router.delete('/meetup/:id', controller.deleteMeetup);

export default router;
