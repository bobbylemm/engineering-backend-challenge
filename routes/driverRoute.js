const { Router } = require('express');

const { validate, addDriverValidationRules } = require('../middlewares/validations')
const { addDriver, getDriver, getAllDrivers } = require('../controllers/driverController')

const router = Router();

router.get('/', getDriver);
router.get('/all', getAllDrivers);
router.post('/',addDriverValidationRules(), validate, addDriver);

module.exports = router;