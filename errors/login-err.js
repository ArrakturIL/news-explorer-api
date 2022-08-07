const statusCodes = require('../utils/status-codes');

class LoginErr extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'LoginErr';
    this.statusCode = statusCode || statusCodes.UNAUTHORIZED;
  }
}
module.exports = LoginErr;
