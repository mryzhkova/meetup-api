export const meetupDTO = meetup => ({
  id: meetup.meetupid,
  title: meetup.meetuptitle,
  desc: meetup.meetupdesc,
  tags: meetup.meetuptags,
  date: meetup.meetupdate,
  location: meetup.meetuplocation
});

export const visitorDTO = visitor => ({
  id: visitor.userid,
  login: visitor.userlogin
});

export const userDTO = user => ({
  id: user.userid,
  login: user.userlogin
});
