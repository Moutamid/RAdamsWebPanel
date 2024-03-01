const express = require("express");
const router = express.Router();

//controllers
const { createVehicle, getAllVehicles, deleteVehicleById, getAllVehicleNumbers } = require("../controllers/vehicle");
//middleware
const { requireSignin, authMiddleware, adminMiddleware } = require("../controllers/auth");

router.post("/create", requireSignin, authMiddleware, createVehicle);
router.get("/vehicles", requireSignin, authMiddleware, getAllVehicles);
router.get("/numbers", requireSignin, authMiddleware, getAllVehicleNumbers);
router.delete("/delete/:id", requireSignin, authMiddleware, deleteVehicleById);

module.exports = router;
