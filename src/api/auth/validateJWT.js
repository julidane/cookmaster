const jwt = require('jsonwebtoken');
const model = require('../../models/UsersModel');

const JWTMalformed = 'jwt malformed';

const API_SECRET = 'mysecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: JWTMalformed });
  }

  try {
    const decoded = jwt.verify(token, API_SECRET);
    
    const user = await model.checkUserEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};