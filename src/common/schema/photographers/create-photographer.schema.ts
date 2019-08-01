import * as Joi from '@hapi/joi';

const createPhotographerSchema = Joi.object().keys({
    firstName: Joi.string().min(2).max(75).required(),
    lastName: Joi.string().min(2).max(75).required(),
    rate: Joi.number().required(),
});

export default createPhotographerSchema;
