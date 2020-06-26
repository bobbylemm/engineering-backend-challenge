const { Drivers, Profiles, Contributions } = require('../models');
const calculateWeeklyinterest = require('../jobs/calculate_interest');
const responseMessage = require('../helpers/messageHelpers');

exports.addDriver = async (req, res) => {
    const { name, username, vehicle, rating, age } = req.body;

    try {
        let [driver, created] = await Drivers.findOrCreate({
            where: {
                username
            },
            defaults: {
                username,
                name
            },
        });

        if(created) {
            driver = {...driver}
            const profileData = JSON.stringify({ vehicle, rating, age, driverId: driver.dataValues.id });
            const initProfile = await createProfile(profileData);
            const initContributions = await createInitialContribution({
                amount: 0,
                interestsPaid: 0,
                driverId: driver.dataValues.id
            });

            if (initProfile && initContributions) {
                return res.status(201).json({
                    message: 'successfully created driver',
                    driver
                });
            };
            responseMessage(res, 400, 'There was an error creating driver"s profile')
        };

        return responseMessage(res, 400, 'This driver"s email already exists');
    } catch(error) {
        return responseMessage(res, 500, 'internal server error')
    }
}

const createProfile = async (data) => {
    try {
        const {_options: { isNewRecord }} = await Profiles.create(JSON.parse(data));

        if(isNewRecord) {
            return true;
        };
        return false;
    }catch(error) {
        return error
    }
}

const createInitialContribution = async (data) => {
    try {
        const { _options: { isNewRecord }} = await Contributions.create(data);
        const task = calculateWeeklyinterest(data.driverId, Contributions);
        task.start();

        if(isNewRecord) {
            return true;
        };
        return false;
    }catch(error) {
        console.log(error, '>>>>>')
        return error
    }
}

exports.editDriver = async (req, res) => {
    const { name } = req.body;
    const { username } = req.query
    try {
        const updatedDriver = await Drivers.update({
            name
        }, { where: { username }, returning: true });

        if(updatedDriver[0]) {
            return res.status(200).json({
                message: 'successfully updated driver',
                driver
            })
        }
        return responseMessage(res, 400, 'error updating driver')
    }catch(error) {
        return responseMessage(res, 500, 'internal server error')
    }
}

exports.getDriver = async (req, res) => {
    try {
        const { username } = req.query;
        const driver = await Drivers.findOne({
            where: {
                username
            },
            include: Profiles
        });
        if (driver === null) {
            return responseMessage(res, 404, 'driver not found')
        }
        return responseMessage(res, 200, driver)
    }catch(error) {
        return responseMessage(res, 500, 'internal server error')
    }
}

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Drivers.findAll({ include: Profiles });
        return responseMessage(res, 200, drivers)
    }catch(error) {
        console.log(error, '>>>>>>>eeeeee')
        return responseMessage(res, 500, 'internal server error')
    }
}