const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const extractIsOwner = (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    req.isOwner = decoded.isOwner || false; 
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
};

module.exports = extractIsOwner;
