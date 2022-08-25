import { StatusCodes } from 'http-status-codes';

import db from '../configs/db.js';
import { meetupDTO, visitorDTO } from '../helpers/dtoHelpers.js';
import { checkValue, validateCreateMeetup, validateUpdateMeetup } from '../helpers/validations.js';
import queries from '../queries/meetup.queries.js';

const { CREATED, INTERNAL_SERVER_ERROR, OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

const createMeetup = async (req, res) => {
  try {
    const { error, value } = validateCreateMeetup(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { title, desc, date, location, tags } = value;
    const { userid } = req.user;
    const newMeetup = await db.query(
      queries.createMeetup,
      [title, desc, tags, date, location, userid]
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
    const meetup = await db.query(queries.getMeetupById, [id]);
    if (!meetup.rows.length) {
      return res.status(NOT_FOUND).json('Meetup does not exist');
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
    const meetup = await db.query(queries.getMeetupById, [id]);
    const { title, desc, date, location, tags } = checkValue(value, meetup.rows[0]);
    const newMeetup = await db.query(
      queries.updateMeetup,
      [title, desc, tags, date, location, id]
    );
    res.status(OK).json(meetupDTO(newMeetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const deleteMeetup = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const meetup = await db.query(queries.deleteMeetup, [id]);
    if (!meetup.rows.length) {
      return res.status(NOT_FOUND).json('Meetup does not exist');
    }
    res.status(OK).json(meetupDTO(meetup.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const addMeetupVisitor = async (req, res) => {
  try {
    const { userid } = req.user;
    const { id } = req.params;
    const meetup = await db.query(queries.getMeetupById, [id]);
    if (!meetup.rows.length) {
      return res.status(NOT_FOUND).json('Meetup does not exist');
    }
    const candidate = await db.query(queries.findVisitor, [userid, id]);
    if (candidate.rows.length) {
      return res.status(BAD_REQUEST).json('The user is already a visitor');
    }
    await db.query(queries.createVisitor, [id, userid]);
    res.status(CREATED).json('Registration for the meetup was successful');
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const getMeetupVisitors = async (req, res) => {
  try {
    const { id } = req.params;
    const meetup = await db.query(queries.getMeetupById, [id]);
    if (!meetup.rows.length) {
      return res.status(NOT_FOUND).json('Meetup does not exist');
    }
    const visitors = await db.query(queries.getVisitorsByIds, [id]);
    res.status(OK).json(visitors.rows.map(visitorDTO));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export default {
  createMeetup,
  getMeetups,
  getMeetup,
  updateMeetup,
  deleteMeetup,
  addMeetupVisitor,
  getMeetupVisitors
};
