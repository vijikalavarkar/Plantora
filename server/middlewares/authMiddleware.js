const jwt = require('jsonwebtoken');
const User = require('../models/auth-user');

const authMiddleware = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization');

        if(!token || !token.startsWith('Bearer ')){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const jwtToken = token.replace('Bearer ', '').trim();

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);

        console.log(isVerified);

        if(!isVerified || !isVerified.email){
            return res.status(401).json({ message: "Unauthorized" })
        }

        const userData = await User.findOne({ email: isVerified.email }).select('-password -cpassword');

        console.log(userData);

        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;

        next();
    } catch (error) {
        console.log(error);
    }
}
module.exports = authMiddleware;