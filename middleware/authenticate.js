const jwt = require('jsonwebtoken');

// This function is used to authenticate the user. It checks if the user has a valid token.
// If the user has a valid token, it will return the user id.
// If the user does not have a valid token, it will return an error message.

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, proces.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).send('Invalid Token');
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticateToken;

