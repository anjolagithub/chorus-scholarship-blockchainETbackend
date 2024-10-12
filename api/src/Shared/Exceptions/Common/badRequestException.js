/**
 * Exception class for HTTP 400 Bad Request errors
 *
 * @class BadRequestException
 * @extends BaseException
 */
import { httpStatusCodes } from "../../Constants/Http/httpStatusCodes.constants.js";
import { httpStatusMessages } from "../../Constants/Http/httpStatusMessages.constants.js";
import BaseException from "../baseException";

export class BadRequestException extends BaseException {
	/**
	 * Creates an instance of BadRequestException.
	 *
	 * @param {string} [errorMessage] - The error message to include in the exception. Defaults to "Sorry, you sent a bad request!"
	 * @memberof BadRequestException
	 */
	constructor(errorMessage) {
		super(
			httpStatusCodes.BAD_REQUEST,
			httpStatusMessages.BAD_REQUEST,
			errorMessage || "you sent a bad request!",
		);
	}
}
