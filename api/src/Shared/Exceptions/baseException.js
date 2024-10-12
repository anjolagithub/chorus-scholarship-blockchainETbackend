export default class BaseException extends Error {
  statusCode;
  statusMessage;

  constructor(statusCode, statusMessage, errorMessage) {
    super(errorMessage);

    this.statusCode = statusCode;
    this.statusMessage = statusMessage;

    // Set the prototype explicitly to maintain correct instanceof checks
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}
