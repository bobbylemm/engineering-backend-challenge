const cron = require('node-cron');
const {Contributions} = require('../models/contribution');


 
const calculateWeeklyinterest = (driverId, model) => {
  const task = cron.schedule('0 0 * * 0', async () => {
    const data = await model.findOne({ where: { driverId }})
    await model.update({
      interestsPaid: data.dataValues.amount * 0.015,
      lastInterestPaidOn: new Date() },
      { where: { driverId }
    });
  });
  return task
}

module.exports = calculateWeeklyinterest;