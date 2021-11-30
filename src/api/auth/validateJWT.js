const jwt = require('jsonwebtoken');
const model = require('../../models/UsersModel');

const JWTMalformed = 'jwt malformed';
const missingToken = 'missing auth token';

const API_SECRET = 'mysecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: missingToken });
  }

  try {
    const decoded = jwt.verify(token, API_SECRET);
    
    const user = await model.checkUserEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: JWTMalformed });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};