import { StatusCodes } from 'http-status-codes';

import db from '../configs/db.js';
import { meetupDTO } from '../helpers/dtoHelper.js';
import { validateCreateMeetup, validateUpdateMeetup } from '../helpers/validator.js';
import queries from '../queries/meetup.queries.js';

const { CREATED, INTERNAL_SERVER_ERROR, OK, BAD_REQUEST } = StatusCodes;

const createMeetup = async (req, res) => {
  try {
    const { error, value } = validateCreateMeetup(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { title, desc, date, location, tags } = value;
    const newMeetup = await db.query(
      queries.createMeetup,
      [title, desc, tags, date, location]
    );
    res.status(CREATED).json(meetupDTO(newMeetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getMeetups = async (req, res) => {
  try {
    const meetups = await db.query(queries.getMeetups);
    res.status(OK).json(meetups.rows.map(meetupDTO));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getMeetup = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const meetup = await db.query(queries.getMeetup, [id]);
    if (!meetup.rows.length) {
      return res.status(BAD_REQUEST).json('Meetup does not exist');
    }
    res.status(OK).json(meetupDTO(meetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const updateMeetup = async (req, res) => {
  try {
    const { error, value } = validateUpdateMeetup(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const id = parseInt(req.params.id, 10);
    const { title, desc, date, location, tags } = value;
    const meetup = await db.query(
      queries.updateMeetup,
      [title, desc, tags, date, location, id]
    );
    res.status(OK).json(meetupDTO(meetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const deleteMeetup = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const meetup = await db.query(queries.deleteMeetup, [id]);
    if (!meetup.rows.length) {
      return res.status(BAD_REQUEST).json('Meetup does not exist');
    }
    res.status(OK).json(meetupDTO(meetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export default {
  createMeetup,
  getMeetups,
  getMeetup,
  updateMeetup,
  deleteMeetup
};
