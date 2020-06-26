const checkIfExists = async (model, condition) => {
    try {
        return await model.findOne({ where: condition, attributes: ['username', 'id']});
    }catch(error) {
        return error;
    }
}
module.exports = checkIfExists;