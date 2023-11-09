require('dotenv').config(); 

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const extractIsAdmin = (req, res, next) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(401).json({ error: 'Token de acceso no proporcionado' });
  }

  try {
    const decoded = jwt.verify(accessToken, secret);
    req.isAdmin = decoded.isAdmin || false; // Si no existe isAdmin, se establece como false
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    } else {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }
};

module.exports = extractIsAdmin;