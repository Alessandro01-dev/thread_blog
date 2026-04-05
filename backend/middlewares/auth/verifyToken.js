const jwt = require('jsonwebtoken')
const InvalidOrMissingTokenException = require('../../exceptions/auth/InvalidOrMissingTokenException')

const verifyToken = (req, res, next) => {

  const token = req.header('Authorization')
  if (!token) {
    throw new InvalidOrMissingTokenException()
  }
  try {
    const sanitizedToken = token.replace('Bearer ', '')
    req.user = jwt.verify(sanitizedToken, process.env.JWT_SECRET)
    next()
  } catch (error) {
    throw new InvalidOrMissingTokenException()
  }
}

module.exports = verifyToken