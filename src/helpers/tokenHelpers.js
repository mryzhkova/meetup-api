import jwt from 'jsonwebtoken';

export const generateAccessToken = async user => {
  const exp = parseInt(process.env.ACCESS_TOKEN_EXP, 10);
  const payload = {
    userid: user.userid,
    roleid: user.roleid
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: exp
  });
};

export const generateRefreshToken = async user => {
  const exp = parseInt(process.env.REFRESH_TOKEN_EXP, 10);
  const payload = {
    userid: user.userid,
    roleid: user.roleid
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: exp
  });
};

export const decodeToken = token => jwt.decode(token);
