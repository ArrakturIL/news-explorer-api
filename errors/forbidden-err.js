const statusCodes = require('../utils/status-codes');

class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenErr';
    this.statusCode = statusCodes.FORBIDDEN;
  }
}
module.exports = ForbiddenErr;
