const dateTochar = 'to_char(meetupdate, \'yyyy-mm-dd hh24:mi\') as meetupdate';

const getMeetups = `SELECT *, ${dateTochar} FROM meetups`;
const getMeetupById = `SELECT *, ${dateTochar} FROM meetups WHERE meetupId = $1`;
const deleteMeetupById = `DELETE FROM meetups WHERE meetupId = $1 RETURNING *, ${dateTochar}`;
const createMeetup = `INSERT INTO meetups
  (meetupTitle, meetupDesc, meetupTags, meetupDate, meetupLocation, meetupCreator)
  VALUES
  ($1, $2, $3, $4, $5, $6) RETURNING *, ${dateTochar}`;
const updateMeetup = `UPDATE meetups
  set 
  meetupTitle = $1,
  meetupDesc = $2,
  meetupTags = $3,
  meetupDate = $4,
  meetupLocation = $5
  WHERE meetupId = $6 RETURNING *, ${dateTochar}`;
const getCurrentMeetup = 'SELECT * FROM currentMeetups WHERE meetupId = $1';
const findVisitor = 'SELECT * FROM currentMeetups WHERE userpId = $1 AND meetupId = $2';
const createVisitor = 'INSERT INTO currentMeetups (meetupId, userId) VALUES ($1, $2) RETURNING *';
const getVisitorsByIds = `SELECT users.userId users.userLogin FROM users
 INNER JOIN currentMeetups ON users.userId = currentMeetups.userId WHERE currentMeetups.meetupId = $1`;

export default {
  getMeetups,
  createMeetup,
  getMeetupById,
  updateMeetup,
  deleteMeetupById,
  getCurrentMeetup,
  findVisitor,
  createVisitor,
  getVisitorsByIds
};
