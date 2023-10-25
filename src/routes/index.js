const { Router } = require("express");
const { accommodationRouter } = require('./accommodation_router');

const router = Router();


router.use('/api/accommodation', accommodationRouter);


router.use((req, res, next) => {
    console.log('Ruta no encontrada:', req.originalUrl);
    res.status(404).json({ error: 'Ruta no encontrada' });
  });
  
module.exports = router;