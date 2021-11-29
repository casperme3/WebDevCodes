const Joi = require('joi');

module.exports.campSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        price: Joi.number().min(0).max(99).required(),
        description: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});