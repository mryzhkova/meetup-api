create TABLE roles (
  roleId SERIAL PRIMARY KEY,
  roleName VARCHAR(50) NOT NULL
);

create TABLE users(
  userId SERIAL PRIMARY KEY,
  userLogin VARCHAR(50) NOT NULL,
  userPassword VARCHAR NOT NULL,
  roleId INT NOT NULL REFERENCES roles
);

create TABLE meetups(
  meetupId SERIAL PRIMARY KEY,
  meetupTitle VARCHAR(50) NOT NULL,
  meetupDesc VARCHAR(255),
  meetupTags VARCHAR(20)[],
  meetupDate TIMESTAMP NOT NULL,
  meetupLocation VARCHAR(50) NOT NULL,
  meetupCreator INT NOT NULL REFERENCES users
);

create TABLE currentMeetups (
  currentMeetupId SERIAL PRIMARY KEY,
  meetupId INT NOT NULL REFERENCES meetups,
  userId INT NOT NULL REFERENCES users
);

create TABLE tokens (
  tokenId SERIAL PRIMARY KEY,
  refreshToken VARCHAR,
  userId INT NOT NULL REFERENCES users
);

INSERT INTO roles (roleName) VALUES
  ('ADMIN'),
  ('USER');

INSERT INTO users (userLogin, userPassword, roleId) VALUES
  ('admin', '$2a$12$yk4Q1/ruNBmHb4SjAFxq6eilSNpZP1OVyReqBfxQCtmn.UWur0dg2', 1), --admin pass
  ('assistant', '$2a$12$jqd0SHVFtjGzkLIeMcLImujT9V4dvYwR7ygky.ChVHga4hEy.2HQC', 1), --admin
  ('user', '$2a$12$nAreO1GTHgHmj7bWD8A0EOv3Tqq1QqFZsZF.7TwkRewi3HBp4nQ5q', 2); --user

