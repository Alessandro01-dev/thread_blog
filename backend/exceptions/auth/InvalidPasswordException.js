const HttpException = require('../index')

class InvalidPasswordException extends HttpException {
  constructor(
    statusCode = 401,
    message = 'Email or password not valid',
    error = 'Invalid credentials provided'
  ) {
    super(statusCode, message, error)
  }
}

module.exports = InvalidPasswordException