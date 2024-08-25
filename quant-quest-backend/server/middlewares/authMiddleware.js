/* eslint-disable camelcase */
const { verifyJwtToken } = require('../utils/token.util');

exports.authMiddleware = async (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.redirect('/login');
  }

  try {
    // Verify the token
    const decoded = verifyJwtToken(token);
    req.user = decoded

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed, redirect to login
    return res.redirect('/login');
  }
};