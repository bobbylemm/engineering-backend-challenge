const {Router} = require('express')

const router = Router()

const { addContribution, getContribution } = require('../controllers/contributionController')

router.get('/', getContribution)
router.post('/', addContribution)

module.exports = router;