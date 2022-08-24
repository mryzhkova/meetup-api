import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';

import db from '../configs/db.js';
import roles from '../constants/roles.js';
import { userDTO } from '../helpers/dtoHelpers.js';
import {
  decodeToken,
  generateAccessToken,
  generateRefreshToken
} from '../helpers/tokenHelpers.js';
import {
  validateSingIn,
  validateSingUp,
  validateToken
} from '../helpers/validations.js';
import queries from '../queries/auth.queries.js';

const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  NO_CONTENT
} = StatusCodes;

const signIn = async (req, res) => {
  try {
    const { error, value } = validateSingIn(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { login, password } = value;
    const user = await db.query(queries.findUserBylogin, [login]);
    if (!user.rows.length) {
      return res.status(UNAUTHORIZED).json('Login not found');
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].userpassword);
    if (!isMatch) {
      return res.status(UNAUTHORIZED).json('Password not found');
    }
    const accessToken = await generateAccessToken(user.rows[0]);
    const refreshToken = await generateRefreshToken(user.rows[0]);

    await db.query(queries.createToken, [refreshToken, user.rows[0].userid]);
    return res.status(OK).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { error, value } = validateSingUp(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { login, password } = value;
    const user = await db.query(queries.findUserBylogin, [login]);
    if (user.rows.length) {
      return res.status(BAD_REQUEST).json('This login is already occupied');
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = await db.query(queries.createUser, [login, hashedPass, roles.USER]);
    res.status(CREATED).json(userDTO(newUser.rows[0]));
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const updatehToken = async (req, res) => {
  try {
    const { error, value } = validateToken(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { refreshToken } = value;
    const token = await db.query(queries.getToken, [refreshToken]);
    if (!token.rows.length) {
      return res.status(NOT_FOUND).json('Token not found');
    }
    const { userid } = decodeToken(token.rows[0].refreshtoken);
    const user = await db.query(queries.findUserById, [userid]);

    const accessToken = await generateAccessToken(user.rows[0]);
    const newRefToken = await generateRefreshToken(user.rows[0]);

    await db.query(queries.udateToken, [newRefToken, userid]);

    return res.status(OK).json({ accessToken, refreshToken: newRefToken });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const deleteToken = async (req, res) => {
  try {
    const { error, value } = validateToken(req.body);
    if (error) {
      return res.status(BAD_REQUEST).json(error.details);
    }
    const { refreshToken } = value;
    const token = await db.query(queries.getToken, [refreshToken]);
    if (!token.rows.length) {
      return res.status(NOT_FOUND).json('Token not found');
    }
    await db.query(queries.deleteToken, [token.rows[0].tokenid]);
    return res.status(NO_CONTENT).json();
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export default {
  signIn,
  signUp,
  updatehToken,
  deleteToken
};
