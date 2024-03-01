const express = require("express");
const router = express.Router();

//controllers
const {
  createTicket,
  uploadTicketPhotos,
  getAllTickets,
  getTicketById,
  getAllHCodes,
  getAllDates,
  getFilteredTickets,
} = require("../controllers/ticket");
//middleware
const { requireSignin, authMiddleware, adminMiddleware } = require("../controllers/auth");

router.post("/create", requireSignin, authMiddleware, uploadTicketPhotos, createTicket); //using multer
router.get("/tickets", requireSignin, authMiddleware, getAllTickets);
router.get("/hcodes", getAllHCodes);
router.get("/dates", getAllDates);
router.get("/filter", getFilteredTickets);
router.get("/:id", requireSignin, authMiddleware, getTicketById);

module.exports = router;
