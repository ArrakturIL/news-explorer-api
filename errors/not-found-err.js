const statusCodes = require('../utils/status-codes');

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundErr';
    this.statusCode = statusCodes.NOT_FOUND;
  }
}
module.exports = NotFoundErr;
