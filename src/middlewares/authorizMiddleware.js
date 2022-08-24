import { StatusCodes } from 'http-status-codes';

import db from '../configs/db.js';
import roles from '../constants/roles.js';
import queries from '../queries/auth.queries.js';

const { FORBIDDEN } = StatusCodes;

const authorizMiddleware = () => async (req, res, next) => {
  const isAdmin = await db.query(queries.findRole, [roles.ADMIN, req.user.userid]);
  if (!isAdmin.rows.length) {
    return res.status(FORBIDDEN).json('you don\'t have enough permissions');
  }
  next();
};

export default authorizMiddleware;
