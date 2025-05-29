const { z } = require('zod');

const userRegisterSchema = z.object({

    firstname: z.
    string({  required_error: "firstname is required" })
    .min(3, { message: "firstname must be at least 3 characters long" })
    .max(20, { message: "firstname must be at most 20 characters long" }),

    lastname: z.
    string({  required_error: "lastname is required" })
    .min(3, { message: "lastname must be at least 3 characters long" })
    .max(20, { message: "lastname must be at most 20 characters long" }),

    email: z.
    string({  required_error: "email is required" })
    .email({ message: "Invalid email address" }),

    phone: z.
    string({  required_error: "phone is required" })
    .min(10, { message: "phone must be at least 10 characters long" })
    .max(10, { message: "phone must be at most 10 characters long" }),


    password: z.
    string({  required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),

    cpassword: z.
    string({  required_error: "confirmPassword is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),

})

const userLoginSchema = z.object({

    email: z.
    string({  required_error: "email is required" })
    .email({ message: "Invalid Credentials" }),

    password: z.
    string({  required_error: "password is required" })
    .min(8, { message: "Invalid Credentials" })
    .max(20, { message: "Invalid Credentials" })
})


const userContactSchema = z.object({

    fullname: z.
    string({  required_error: "firstname is required" })
    .min(3, { message: "firstname must be at least 3 characters long" })
    .max(20, { message: "firstname must be at most 20 characters long" }),


    email: z.
    string({  required_error: "email is required" })    
    .email({ message: "Invalid email address" }),

    phone: z.
    string({  required_error: "phone is required" })
    .min(10, { message: "phone must be at least 10 characters long" })
    .max(10, { message: "phone must be at most 10 characters long" }),

    message: z. 
    string({  required_error: "message is required" })
    .min(3, { message: "message must be at least 3 characters long" })
    .max(200, { message: "message must be at most 200 characters long" }),

})

module.exports = { userRegisterSchema, userLoginSchema, userContactSchema };