const validate = (schema) => async (req, res, next) => {
    try {
        
        const parsedResult = await schema.parseAsync(req.body);
        req.body = parsedResult;
        next();
        
    } catch (error) {
        
        const statusCode = 422;
        const errorMessage = 'Please fill in all the required fields';
        const extraDetails = error.errors[0].message;

        const errorResponse = {
            statusCode,
            errorMessage,
            extraDetails
        }

        res.status(statusCode).json(errorResponse);

    }
}
module.exports = validate;