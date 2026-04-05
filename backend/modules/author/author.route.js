const express = require("express")
const router = express.Router()
const authorController = require("./author.controller")
const { cloudUpload } = require("../../middlewares/upload")
const verifyToken = require("../../middlewares/auth/verifyToken")

router.get("/authors", authorController.findAll)
router.get("/authors/:userId", authorController.findOne)

router.post("/authors/avatar", verifyToken, cloudUpload.single('avatar'), authorController.uploadFileOnCloud)
router.post("/authors", authorController.create)

router.patch("/authors/me", verifyToken, authorController.update)
router.patch("/authors/me/avatar", verifyToken, cloudUpload.single('avatar'), authorController.uploadFileOnCloud)

router.delete("/authors/me", verifyToken, authorController.deleteOne)

module.exports = router