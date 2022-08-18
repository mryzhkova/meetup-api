const dateTochar = 'to_char(meetupdate, \'yyyy-mm-dd hh24:mi\') as meetupdate';

const getMeetups = `SELECT *, ${dateTochar} FROM meetup`;
const getMeetup = `SELECT *, ${dateTochar} FROM meetup WHERE meetupId = $1`;
const deleteMeetup = `DELETE FROM meetup WHERE meetupId = $1 RETURNING *, ${dateTochar}`;
const createMeetup = `INSERT INTO meetup
  (meetupTitle, meetupDesc, meetupTags, meetupDate, meetupLocation)
  VALUES
  ($1, $2, $3, $4, $5) RETURNING *, ${dateTochar}`;
const updateMeetup = `UPDATE meetup
  set 
  meetupTitle = $1,
  meetupDesc = $2,
  meetupTags = $3,
  meetupDate = $4,
  meetupLocation = $5
  WHERE meetupId = $6 RETURNING *, ${dateTochar}`;

export default {
  getMeetups,
  createMeetup,
  getMeetup,
  updateMeetup,
  deleteMeetup
};
