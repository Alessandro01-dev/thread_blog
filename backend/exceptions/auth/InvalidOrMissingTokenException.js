const HttpException = require("../index");

class InvalidOrMissingTokenException extends HttpException {
  constructor(
    statusCode = 401,
    message = 'Invalid or missing token',
    error = 'The provided token is invalid or expired'
  ) {
    super(statusCode, message, error)
  }
}

module.exports = InvalidOrMissingTokenException