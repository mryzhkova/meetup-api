export const meetupDTO = meetup => ({
  id: meetup.meetupid,
  title: meetup.meetuptitle,
  desc: meetup.meetupdesc,
  tags: meetup.meetuptags,
  date: meetup.meetupdate,
  location: meetup.meetuplocation
});
