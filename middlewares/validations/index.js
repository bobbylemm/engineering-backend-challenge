const { body, validationResult } = require('express-validator');

const addDriverValidationRules = () => {
  return [
    body('username').isString().isLength({min: 3}).notEmpty(),
    body('vehicle').isString().isLength({min: 3}).notEmpty(),
    body('rating').isNumeric(),
    body('rating').custom(rating => {
      if (rating > 5 || rating < 1) {
        return Promise.reject('rating must be between 1 and 5')
      }
      return true;
    }),
  ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
  module.exports = {
    addDriverValidationRules,
    validate,
  }