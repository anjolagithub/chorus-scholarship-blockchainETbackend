/**
 * A custom exception class to handle not found exceptions. Extends the BaseException class.
 *
 * @class NotFoundException
 * @extends {BaseException}
 */
import { httpStatusCodes } from "../../Constants/Http/httpStatusCodes.constants.js";
import { httpStatusMessages } from "../../Constants/Http/httpStatusMessages.constants.js";
import BaseException from "../baseException.js";

export class NotFoundException extends BaseException {
	/**
	 * Creates an instance of NotFoundException.
	 * @param {string} [errorMessage] - The error message associated with the exception.
	 * @memberof NotFoundException
	 */
	constructor(errorMessage) {
		super(
			httpStatusCodes.NOT_FOUND,
			httpStatusMessages.NOT_FOUND,
			errorMessage || "the resource is not found!",
		);
	}
}
