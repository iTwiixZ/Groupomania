const express = require("express");
const router = express.Router();
const posts = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Posts routes
router.post("/new", auth, multer, posts.createPost);
router.get("/getOne", auth, multer, posts.getOnePost);
router.get("/getAll", auth, multer, posts.getAllPosts);
router.delete("/:id", auth, multer, posts.deletePost);

module.exports = router;
