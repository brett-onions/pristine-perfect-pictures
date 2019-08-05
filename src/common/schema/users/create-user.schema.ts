import * as Joi from '@hapi/joi';

const createUserSchema = Joi.object().keys({
    username: Joi.string().min(10).max(75).required(),
    password: Joi.string().min(8).max(75).required(),
    accountType: Joi.string().valid('Customer', 'Photographer'),
});

export default createUserSchema;
