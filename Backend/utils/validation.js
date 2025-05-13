import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  username: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
//////////////////////////////

export const coachRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  experience: Joi.number().min(0).required(),
  expertise: Joi.string().min(1).required(),
  pricing: Joi.object({
    oneMonth: Joi.number().required(),
    threeMonths: Joi.number().required(),
    sixMonths: Joi.number().required(),
    oneYear: Joi.number().required()
  }).required(),
  freeSlots: Joi.array()
    .items(
      Joi.object({
        start: Joi.string().required(),
        end: Joi.string().required()
      })
    )
    .required()
});

export const coachLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

////////////////////////////////


export const adminLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
  });