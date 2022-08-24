const findUserBylogin = 'SELECT * FROM users WHERE userLogin = $1';
const findUserById = 'SELECT * FROM users WHERE userId = $1';
const createUser = `INSERT INTO users (userLogin, userPassword, roleId) VALUES
($1, $2, $3) RETURNING *`;
const createToken = 'INSERT INTO tokens (refreshToken, userId) VALUES ($1, $2)';
const getToken = 'SELECT * FROM tokens WHERE refreshToken = $1';
const udateToken = 'UPDATE tokens set refreshToken = $1 WHERE userId =$2';
const deleteToken = 'DELETE FROM tokens WHERE tokenId = $1';
const findRole = 'SELECT * FROM users WHERE roleId = $1 AND userId = $2';

export default {
  findUserBylogin,
  findUserById,
  createUser,
  createToken,
  udateToken,
  getToken,
  deleteToken,
  findRole
};
