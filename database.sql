create TABLE meetup(
  meetupId SERIAL PRIMARY KEY,
  meetupTitle VARCHAR(50) NOT NULL,
  meetupDesc VARCHAR(255),
  meetupTags VARCHAR(20)[],
  meetupDate TIMESTAMP NOT NULL,
  meetupLocation VARCHAR(50) NOT NULL
);