import { Http } from "../Constants";

/**
 * Creates a success response object
 * @param {string} name - The name of the success operation
 * @param {string} message - The message of the response
 * @returns {ResponseObject} - The response object with success, name, status, code, and message fields
 */
export const handleHttpSuccessResponse = (name, message) => ({
	success: true,
	name,
	status: Http.httpStatusCodes.OK,
	code: Http.httpStatusMessages.OK,
	message,
});
