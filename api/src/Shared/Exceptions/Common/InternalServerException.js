/**
 * Custom exception for Internal Server Error.
 * @extends BaseException
 */
import { httpStatusCodes } from "../../Constants/Http/httpStatusCodes.constants.js";
import { httpStatusMessages } from "../../Constants/Http/httpStatusMessages.constants.js";
import BaseException from "../baseException";

export class InternalServerException extends BaseException {
	/**
	 * Creates an instance of InternalServerException.
	 * @param {string} errorMessage - The error message.
	 */
	constructor(errorMessage) {
		super(
			httpStatusCodes.INTERNAL_SERVER_ERROR,
			httpStatusMessages.INTERNAL_SERVER_ERROR,
			errorMessage || "the process went wrong!",
		);
	}
}
