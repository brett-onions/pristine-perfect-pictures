import * as Joi from '@hapi/joi';

const updatePhotographerSchema = Joi.object().keys({
    firstName: Joi.string().min(2).max(75).required(),
    lastName: Joi.string().min(2).max(75).required(),
}).with('firstName', 'lastName');

export default updatePhotographerSchema;
