const express = require("express");
const router = express.Router();

// import middlewares
const { requireSignin, authMiddleware, adminMiddleware, confirmation } = require("../controllers/auth");
// import validator

// import controllers
const { read, update, users, profile, getOne, editUser, getDriverNames } = require("../controllers/user");

// routes
router.get("/user", requireSignin, authMiddleware, read);
router.get("/admin", requireSignin, adminMiddleware, read);
router.put("/update", requireSignin, authMiddleware, update);
router.get("/users", users);
router.get("/drivers", getDriverNames);
router.get("/profile", requireSignin, authMiddleware, profile);
router.get("/user/:id", requireSignin, authMiddleware, adminMiddleware, getOne);
router.put("/edit/:id", requireSignin, authMiddleware, adminMiddleware, editUser);

module.exports = router;
