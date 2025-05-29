const errorMiddleware = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || 'Internal Server Error';
    const extraDetails = err.extraDetails || 'Something went wrong';

    return res.status(statusCode).json({  errorMessage, extraDetails});

}
module.exports = errorMiddleware;