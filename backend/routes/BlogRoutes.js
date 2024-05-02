const express = require("express");
const router = express.Router();
const upload = require("../config/Multer.js");
const authToken = require('../utils/authToken')

const {
  GetAllBlog,
  GetSpecificBlog,
  CreateBlogWithAuth,
  EditBlogWithAuth,
  DeleteBlogWithAuth
} = require("../controllers/BlogController.js");

// Routes for Service
router.get("/", GetAllBlog);
router.get("/:id", GetSpecificBlog);
router.use(authToken)
router.post("/create", upload.single("file"), CreateBlogWithAuth);
router.patch("/edit/:id", upload.single("file"), EditBlogWithAuth);
router.delete("/delete/:id", DeleteBlogWithAuth);

module.exports = router;
