const responseMessage = (res, statusCode, message) => res.status(statusCode).json({
    message,
    statusCode
});
 
module.exports = responseMessage;