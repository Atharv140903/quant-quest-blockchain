/* eslint-disable camelcase */
const { verifyJwtToken } = require('../utils/token.util');

exports.authMiddleware = async (req, res, next) => {
  // Get the token from the request cookies
  const token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = verifyJwtToken(token);

    const { walletAddress } = decoded.walletAddress;

    // Check if user exists
    const user = await userRepository.getUserByAddress(walletAddress);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token', error: err.message });
  }
};