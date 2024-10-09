const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/Validation');
const { signup, login } = require('../controllers/Auth');
const router = express.Router();

router.post('/login',loginValidation,login);

router.post('/signup',signupValidation,signup);

module.exports = router;

