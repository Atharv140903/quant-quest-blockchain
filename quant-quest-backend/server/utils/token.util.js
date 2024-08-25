const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createJwtToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SEC, { expiresIn: '1d' });
  return token;
};

exports.verifyJwtToken = (token, next) => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SEC);
    return decode;
  } catch (err) {
    next(err);
  }
};