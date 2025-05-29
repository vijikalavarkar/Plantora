const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verifyOTP: {
        type: String,
        default: ""
    },
    verifyOTPExpireAt: {
        type: Number,
        default: 0
    },
    resetOTP: {
        type: String,
        default: ""
    },
    resetOTPExpireAt: {
        type: Number,
        default: 0
    }

})

// hash password
userSchema.pre('save', async function(next){

    const user = this;

    if(!user.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    const hashedCPassword = await bcrypt.hash(user.cpassword, salt);
    user.cpassword = hashedCPassword;

    next();

})

// JWT Token
userSchema.methods.generateAuthToken = async function(){

    return jwt.sign({ userId: this._id.toString(), email: this.email, phone: this.phone, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

}

// compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;