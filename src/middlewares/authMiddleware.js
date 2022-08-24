import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = StatusCodes;

const authMiddleware = (req, res, next) => passport.authenticate(
  'jwt',
  { session: false },
  (error, user, info) => {
    if (error) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
    if (!user || info) {
      return res.status(UNAUTHORIZED).json('Incorrect token');
    }
    req.user = user;
    next();
  }
)(req, res, next);

export default authMiddleware;
