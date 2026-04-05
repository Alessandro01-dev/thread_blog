const HttpException = require('../index')

class UserNotFoundException extends HttpException {
    constructor(
        statusCode = 404,
        message = 'User not found',
        error = 'The requested user does not exist'
    ) {
        super(statusCode, message, error);
    }
}

module.exports = UserNotFoundException