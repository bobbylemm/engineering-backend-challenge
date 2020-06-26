const { Contributions, Drivers } = require('../models');

const responseMessage = require('../helpers/messageHelpers');
const checkIfExists = require('../helpers/checkIfExists');

exports.addContribution = async (req, res) => {
    try {
        const { username } = req.query; 
        const { amount } = req.body;

        const driver = await checkIfExists(Drivers, { username })

        await Contributions.increment('amount', { 
            by: amount, returning: true, where: { driverId: driver.dataValues.id 
            } 
        })
        responseMessage(res, 200, 'You have successfully topped your contributions')
    } catch (error) {
        return responseMessage(res, 500, 'internal server error')
    }
}

exports.getContribution = async (req, res) => {
    try {
        const { username } = req.query; 
        const driver = await checkIfExists(Drivers, { username })
        if (driver === null) {
            return responseMessage(res, 404, 'This driver does not exist')
        }
        const result = await Contributions.findOne({ where: { driverId: driver.id } });
        return res.status(200).json({
            message: 'Fetched driver"s contributions',
            contributions: {...result.dataValues, total: result.amount + result.interestsPaid}
        })
    } catch (error) {
        return responseMessage(res, 500, 'internal server error')
    }
}