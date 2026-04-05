const HttpException = require('../index')

class SocialAccountException extends HttpException {
  constructor(
    statusCode = 400,
    message = 'This account uses social login',
    error = 'Please login with Google or GitHub'
  ) {
    super(statusCode, message, error)
  }
}

module.exports = SocialAccountException