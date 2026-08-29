import * as Joi from 'joi';

export const userIdQuerySchema = Joi.object({
  userId: Joi.string().uuid().required().label('User id').messages({
    'string.base': `"User id" must be a string`,
    'string.empty': `"User id" is required`,
    'string.guid': `"User id" must be a valid UUID`,
    'any.required': `"User id" is required`,
  }),
});
