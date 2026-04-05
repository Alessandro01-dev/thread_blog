const verifyToken = require('../../middlewares/auth/verifyToken')
const authController = require('./auth.controller')
const express = require("express")
const router = express.Router()

router.get('/me', verifyToken, authController.loggedUser)

router.post("/login", authController.login)

module.exports = router