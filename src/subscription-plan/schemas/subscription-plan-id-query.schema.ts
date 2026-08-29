import * as Joi from 'joi';

export const subscriptionPlanIdQuerySchema = Joi.object({
  planId: Joi.string().uuid().required().label('Plan id').messages({
    'string.base': `"Plan id" must be a string`,
    'string.empty': `"Plan id" is required`,
    'string.guid': `"Plan id" must be a valid UUID`,
    'any.required': `"Plan id" is required`,
  }),
});
