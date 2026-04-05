const HttpException = require('../../exceptions')
const mongoose = require('mongoose')

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      error: err.error
    })
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid or malformed ObjectId',
      error: err.message
    })
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      statusCode: 400,
      message: 'One or more fields failed validation',
      error: err.errors
    })
  }

  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
    error: 'UNEXPECTED_ERROR'
  })
}

module.exports = errorHandler
