const statusCodes = require('../utils/status-codes');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestErr';
    this.status = statusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequestErr;
