import Joi from 'joi';

export const createApplicationValidator = Joi.object({
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  nationality: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid('Male', 'Female', 'Rather not say').required(),
  currentLevelofEducation: Joi.string().required(),
  schoolName: Joi.string().required(),
  major: Joi.string().required(),
  documents: Joi.object({
    proofOfEnrollment: Joi.string().required().messages({
      "string.base": "Proof of enrollment must be a string",
      "any.required": "Proof of enrollment is required",
    }),
    academicTranscripts: Joi.string().required().messages({
      "string.base": "Academic transcripts must be a string",
      "any.required": "Academic transcripts are required",
    }),
    letterOfRecommendation: Joi.string().required().messages({
      "string.base": "Letter of recommendation must be a string",
      "any.required": "Letter of recommendation is required",
    }),
    personalStatement: Joi.string().required().messages({
      "string.base": "Personal statement must be a string",
      "any.required": "Personal statement is required",
    }),
  }).required(),
  expectedGraduationDate: Joi.date().greater('now').required(),
  fundingNeeded: Joi.string()
    .valid('Full tuition', 'Partial tuition', 'Living expenses')
    .required(),
  motivationStatement: Joi.string().required(),
  amountRequested: Joi.number().required(),
});

export const validateGetAllApplications = Joi.object({
    sort: Joi.number().valid(1, -1),
    pageSize: Joi.number().min(1).default(10),
    pageNumber: Joi.number().min(1).default(1),
  })

export class ApplicationValidator {
  static validateCreateApplicationInput = (data) => {
    return createApplicationValidator.validate(data, { abortEarly: false });
  };

  static validateGetAllApplications = (data) => {
    return validateGetAllApplications.validate(data, { abortEarly: false });
  }

}