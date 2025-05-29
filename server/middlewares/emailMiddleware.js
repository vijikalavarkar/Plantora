const jwt = require('jsonwebtoken')

const emailMiddleware = (req, res, next) => {
    try {
        
        const token = req.header('Authorization');

        if(!token || !token.startsWith('Bearer ')){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const jwtToken = token.replace('Bearer ', '').trim();

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

        console.log(isVerified);

        if(!isVerified || !isVerified.userId){
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = { userId: isVerified.userId }
        
        next();
    } catch (error) {
        console.log(error)
    }
}
module.exports = emailMiddleware;