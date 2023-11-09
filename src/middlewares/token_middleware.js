require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;


const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id, isAdmin: user.isAdmin, isOwner: user.isOwner }, secretKey, { expiresIn: '30m' });
  const refreshToken = jwt.sign({ userId: user._id}, secretKey, { expiresIn: '7d' });
    users[user.id].accessToken = accessToken;
    users[user.id].refreshToken = refreshToken;
    return { accessToken, refreshToken };
  };
  
  const verifyToken = (req, res, next) => {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.headers['refresh-token'];
  
    if (!accessToken) {
      return res.status(401).json({ error: 'Token de acceso no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(accessToken, secret);
      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError' && refreshToken) {
        try {
          jwt.verify(refreshToken, secret);
          const user = users[req.user.id];
          if (user && user.refreshToken === refreshToken) {
            const newTokens = generateTokens(user);
            res.setHeader('Authorization', newTokens.accessToken);
            res.setHeader('Refresh-Token', newTokens.refreshToken);
            req.user = jwt.verify(newTokens.accessToken, secret);
            next();
          } else {
            return res.status(401).json({ error: 'Token de refresco inválido' });
          }
        } catch (err) {
          return res.status(401).json({ error: 'Token de refresco inválido' });
        }
      } else {
        return res.status(401).json({ error: 'Token inválido' });
      }
    }
  };
  
  module.exports = verifyToken;