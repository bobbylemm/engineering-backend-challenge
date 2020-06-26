const { Router } = require('express')

const driverRoute = require('./driverRoute');
const contributionRoute = require('./contributionRoute');

const router = Router();

router.use('/driver', driverRoute)
router.use('/contribution', contributionRoute)

module.exports = router;