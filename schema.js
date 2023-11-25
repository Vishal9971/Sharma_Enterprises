const joi = require('joi');
const productSchema = joi.object({
  name:joi.string().required(),
  img:joi.string().required(),
  des:joi.string(),
  price:joi.number().required(),
});


const reviewSchema = joi.object({
  rating:joi.number(),
  comment:joi.string().required(),
})

module.exports = {productSchema,reviewSchema};