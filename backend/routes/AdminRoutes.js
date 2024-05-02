const express = require("express");
const router = express.Router();
const authToken = require("../utils/authToken");

const {
  GetAllAdminWithAuth,
  GetSpecificAdminWithAuth,
  CreateAdminWithAuth,
  UpdateAdminWithAuth,
  DeleteAdminWithAuth,
} = require("../controllers/AdminController.js");

// Routes for Service
router.use(authToken);
router.get("/", GetAllAdminWithAuth);
router.get("/:id", GetSpecificAdminWithAuth);
router.post("/createz", CreateAdminWithAuth);
router.patch("/edit/:id", UpdateAdminWithAuth);
router.delete("/delete/:id", DeleteAdminWithAuth);

module.exports = router;
