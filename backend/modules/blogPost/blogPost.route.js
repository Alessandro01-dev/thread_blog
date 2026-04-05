const express = require("express")
const router = express.Router()
const blogPostController = require("./blogPost.controller")
const { cloudUpload } = require("../../middlewares/upload/index")
const verifyToken = require("../../middlewares/auth/verifyToken")

router.get("/blogPosts", blogPostController.findAll)
router.get("/search/blogPosts", blogPostController.findByTitle)
router.get("/blogPosts/:blogPostId", blogPostController.findOne)

router.post("/blogPosts/cover", verifyToken, cloudUpload.single('cover'), blogPostController.uploadFileOnCloud)
router.post("/blogPosts", verifyToken, blogPostController.create)

router.patch("/blogPosts/:blogPostId/cover", verifyToken, cloudUpload.single('cover'), blogPostController.uploadFileOnCloud)
router.patch("/blogPosts/:blogPostId", verifyToken, blogPostController.update)

router.delete("/blogPosts/:blogPostId", verifyToken, blogPostController.deleteOne)

module.exports = router