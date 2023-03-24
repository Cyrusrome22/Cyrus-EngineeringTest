import Joi from 'joi';

const createValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const updateValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('Completed', 'Open', 'In Progress'),
});

const reorderValidation = Joi.object({
  id: Joi.string().required(),
  position: Joi.number().required(),
});

export default {
  createValidation,
  updateValidation,
  reorderValidation,
};
