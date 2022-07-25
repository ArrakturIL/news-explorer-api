const statusCodes = require('../utils/status-codes');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictErr';
    this.statusCode = statusCodes.CONFLICT;
  }
}
module.exports = ConflictErr;
