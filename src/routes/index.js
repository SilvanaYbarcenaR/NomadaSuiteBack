const { Router } = require("express");
const { accommodationRouter } = require("./accommodation_router");
const { servicesRouter } = require("./services_router");
const { filteredRouter } = require("./filetered_router");
const router = Router();

router.use("/api/accommodation", accommodationRouter);
router.use("/api/services", servicesRouter);
router.use("/api/filtered", filteredRouter);

router.use((req, res, next) => {
  console.log("Ruta no encontrada:", req.originalUrl);
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = router;
