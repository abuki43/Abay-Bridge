class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add a "message" property on family class
    this.code = errorCode; // add a "code" property
  }
}

module.exports = HttpError;
