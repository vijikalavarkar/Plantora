const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controllers')
const validate = require('../middlewares/validate-middleware');
const { userRegisterSchema, userLoginSchema, userContactSchema } = require('../validators/auth-validators');
const authMiddleware = require('../middlewares/authMiddleware');
const emailMiddleware = require('../middlewares/emailMiddleware')

router.route('/').get(authController.home);
router.route('/register').post(validate(userRegisterSchema), authController.register);
router.route('/login').post(validate(userLoginSchema), authController.login);
router.route('/service').get(authController.service);
router.route('/about').get(authController.about);
router.route('/contact').post(validate(userContactSchema), authController.contact);
router.route('/user').get(authMiddleware, authController.user);

// email verifications
router.route('/sendverifyotp').post(emailMiddleware, authController.sendverifyotp);
router.route('/verifyotp').post(emailMiddleware, authController.verifyotp);
router.route('/sendresetotp').post(emailMiddleware, authController.sendresetotp);
router.route('/verifyresetotp').post(emailMiddleware, authController.verifyresetotp);
module.exports = router;