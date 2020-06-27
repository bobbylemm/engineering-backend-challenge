const { body, validationResult } = require("express-validator");

const addDriverValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("must not be empty"),
    body("username").isString().withMessage("must be a string"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("must be more than 3 words"),
    body("vehicle")
      .isString()
      .withMessage("must be a string")
      .isLength({ min: 3 })
      .withMessage("must be more than 3 words")
      .notEmpty()
      .withMessage("must not be empty"),
    body("rating").isNumeric().withMessage("must be a number"),
    body("rating").custom((rating) => {
      if (rating > 5 || rating < 1) {
        return Promise.reject("rating must be between 1 and 5");
      }
      return true;
    }),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  addDriverValidationRules,
  validate,
};
