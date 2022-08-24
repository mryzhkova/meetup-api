import { ExtractJwt, Strategy } from 'passport-jwt';

import queries from '../queries/auth.queries.js';

import db from './db.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

const strategy = new Strategy(opts, (jwtPayload, done) => {
  db.query(queries.findUserById, [jwtPayload.userid], (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user.rows[0]) {
      return done(null, user.rows[0]);
    }
    return done(null, false);
  });
});

export default strategy;
