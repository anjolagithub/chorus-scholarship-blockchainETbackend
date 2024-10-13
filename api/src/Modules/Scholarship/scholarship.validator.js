import Joi from 'joi';

export const createScholarshipValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  amount: Joi.number().required(),
  eligibilityCriteria: Joi.string().required(),
  applicationDeadline: Joi.date().required(),
  status: Joi.string().valid('Open', 'Closed', 'Awarded').default('Open')
});

export const validateGetAllApplications = Joi.object({
    sort: Joi.number().valid(1, -1),
    pageSize: Joi.number().min(1).default(10),
    pageNumber: Joi.number().min(1).default(1),
})

export class ScholarshipValidator {
  static validateCreateScholarshipInput = (data) => {
    return createScholarshipValidator.validate(data, { abortEarly: false });
  };

  static validateGetAllApplications = (data) => {
    return validateGetAllApplications.validate(data, { abortEarly: false });
  }

}