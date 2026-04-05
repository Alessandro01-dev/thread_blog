const jwt = require('jsonwebtoken')
const InvalidOrMissingTokenException = require('../../exceptions/auth/InvalidOrMissingTokenException')
const AuthorSchema = require('../../modules/author/author.schema')

const verifyToken = async (req, res, next) => {

  const token = req.header('Authorization')
  if (!token) {
    return next(new InvalidOrMissingTokenException())
  }

  try {
    const sanitizedToken = token.replace('Bearer ', '')
    const decoded = jwt.verify(sanitizedToken, process.env.JWT_SECRET)
    
    const user = await AuthorSchema.findById(decoded.id).select('-password')
    
    if (!user) {
      throw new InvalidOrMissingTokenException()
    }

    req.user = user
    next()
  } catch (error) {
    next(new InvalidOrMissingTokenException())
  }
}

module.exports = verifyToken