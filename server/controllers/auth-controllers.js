const User = require('../models/auth-user');
const Contact = require('../models/contact-model');
const Service = require('../models/service-model');
const transporter = require('../utilities/nodemailer');
const bcrypt = require('bcryptjs')

const home = async (req, res) => {
    try {
        
        return res.status(200).json({ message: "Welcome to the home page" })

    } catch (error) {
        console.log(error);
    }
}

const register = async (req, res) => {
    try {

        const { firstname, lastname, email, phone, password, cpassword } = req.body;
        
        const emailExists = await User.findOne({ email: email });

        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" })
        }

        if(password != cpassword){
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const userCreated = await User.create({ firstname, lastname, email, phone, password, cpassword });

        // send mail
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to the PLANTORA",
            text: "Hello Broo", // plain‑text body
            html: `<b>Hello ${firstname}</b>, Thanks for choosing plantora`, // HTML body
        }
        
        await transporter.sendMail(mailOption)
        
        return res.status(200).json({ message: 'User Registered Successfully...', userCreated, token: await userCreated.generateAuthToken(), userId: userCreated._id.toString() })

    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const emailExists = await User.findOne({ email: email });

        if (!emailExists) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatch = await emailExists.comparePassword(password);

        if (isMatch) {
            return res.status(200).json({ message: 'User LoggedIn Successfully...', token: await emailExists.generateAuthToken(), userId: emailExists._id.toString() })
        }else{
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        //return res.status(200).json({ message: "Welcome to the login page" })

    } catch (error) {
        console.log(error);
    }
}

const service = async (req, res) => {
    try {
        
        const serviceData = await Service.find();

        return res.status(200).json({ serviceData })

    } catch (error) {
        console.log(error);
    }
}

const about = async (req, res) => {
    try {
        
        return res.status(200).json({ message: "Welcome to the about page" })

    } catch (error) {
        console.log(error);
    }
}

const contact = async (req, res) => {
    try {

        const { fullname, email, phone, message } = req.body;
        
        const contactCreated = await Contact.create({ fullname, email, phone, message });

        return res.status(200).json({ message: "Message Sent Successfully ...", contactCreated })

    } catch (error) {
        console.log(error);
    }
}


const user = async (req, res) => {
    try {
        

        
        const userData = req.user;

        return res.status(200).json({ userData })

    } catch (error) {
        console.log(error);
    }
}

const sendverifyotp = async (req, res) => {
    try {
        
        const { userId } = req.user;

        const user = await User.findById(userId);

        if(user.isAccountVerified){
            return res.status(200).json({ message: "Account Already Verified ..." })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.verifyOTP = otp;
        user.verifyOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        // send mail
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify OTP",
            text: "Verify OTP", // plain‑text body
            html: `<b>Hello Your OTP is : ${otp}</b>`, // HTML body
        }
        
        await transporter.sendMail(mailOption)

        return res.status(200).json({ message: "Verification OTP sent successfully" })

    } catch (error) {
        console.log(error);
    }
}


const verifyotp = async (req, res) => {

    const { userId } = req.user;
    const { otp } = req.body;

    if(!userId || !otp){
        return res.status(200).json({ message: "Missing Details" })
    }

    try {
        
        const user = await User.findById(userId);

        if(!user){
            return res.status(200).json({ message: "User not found" })
        }

        if(user.verifyOTP === "" || user.verifyOTP !== otp){
            return res.status(200).json({ message: "Invalid OTP" })
        }

        if(user.verifyOTPExpireAt < Date.now()){
            return res.status(200).json({ message: "OTP Expired" })
        }

        user.isAccountVerified = true
        user.verifyOTP = ""
        user.verifyOTPExpireAt = 0

        return res.status(200).json({ message: "Account Verified Successfully" })

    } catch (error) {
        console.log(error);
    }
}


const sendresetotp = async (req, res) => {
    try {
        
        const { email } = req.body;

        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(200).json({ message: "User not found" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))

        user.resetOTP = otp;
        user.resetOTPExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        // send mail
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset OTP",
            text: "Reset OTP", // plain‑text body
            html: `<b>Hello Your Reset OTP is : ${otp}</b>`, // HTML body
        }
        
        await transporter.sendMail(mailOption)

        return res.status(200).json({ message: "Reset OTP sent Successfully" })

    } catch (error) {
        console.log(error);
    }
}

const verifyresetotp = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword){
        return res.status(200).json({ message: "Missing Details" })
    }

    try {
        
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(200).json({ message: "User Not found" })
        }

        if(user.resetOTP === "" || user.resetOTP !== otp){
            return res.status(200).json({ message: "Invalid OTP" })
        }

        if(user.resetOTPExpireAt < Date.now()){
            return res.status(200).json({ message: "OTP Expired" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        await User.updateOne({ email: email}, { password: hashedNewPassword }, { cpassword: hashedNewPassword })

        user.resetOTP = ""
        user.resetOTPExpireAt = 0;

        await user.save();

        return res.status(200).json({ message: "Password reset successfull" })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { home, register, login, service, about, contact, user, sendverifyotp, verifyotp, sendresetotp, verifyresetotp }