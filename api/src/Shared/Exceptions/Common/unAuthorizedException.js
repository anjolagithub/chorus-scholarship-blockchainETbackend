/**
 * Represents an exception to be thrown when a user is not authorized to perform an action.
 * @extends BaseException
 */
import { httpStatusCodes } from "../../Constants/Http/httpStatusCodes.constants.js";
import { httpStatusMessages } from "../../Constants/Http/httpStatusMessages.constants.js";
import BaseException from "../baseException";

export class UnAuthorizedException extends BaseException {
	/**
	 * Creates an instance of UnAuthorizedException.
	 * @param {string} errorMessage - The error message to be included in the exception. Defaults to "Sorry, you are not authorized to do this!" if not provided.
	 */
	constructor(errorMessage) {
		super(
			httpStatusCodes.UNAUTHORIZED,
			httpStatusMessages.UNAUTHORIZED,
			errorMessage || "you are not authorized to do this!",
		);
	}
}
