const express = require("express")
const commentController = require("./comment.controller")
const verifyToken = require("../../middlewares/auth/verifyToken")
const router = express.Router()

router.get("/blogPosts/:id/comments", commentController.findBlogPostComments)
router.get("/blogPosts/:id/comments/:commentId", commentController.findBlogPostCommentById)

router.post("/blogPosts/:id/comments", verifyToken, commentController.createComment)

router.patch("/blogPosts/:id/comments/:commentId", verifyToken, commentController.updateComment)

router.delete("/blogPosts/:id/comments/:commentId", verifyToken, commentController.deleteComment)

module.exports = router