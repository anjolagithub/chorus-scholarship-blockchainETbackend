/**
 * Exception thrown when a user tries to perform an action that is not allowed.
 * @class
 * @extends BaseException
 */
import { httpStatusCodes } from "../../Constants/Http/httpStatusCodes.constants.js";
import { httpStatusMessages } from "../../Constants/Http/httpStatusMessages.constants.js";
import BaseException from "../baseException.js";

export class ForbiddenException extends BaseException {
  /**
   * Creates an instance of ForbiddenException.
   * @param {string} [errorMessage] - The error message to be displayed.
   */
  constructor(errorMessage) {
    super(
      httpStatusCodes.FORBIDDEN,
      httpStatusMessages.FORBIDDEN,
      errorMessage || "you are not allowed to do this!"
    );
  }
}
