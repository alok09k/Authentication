const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await users.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "user is already exist , go to Login", success: false });
        }
        const userModel = new users({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201)
            .json({
                message: "Signup Successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { name,email, password } = req.body;
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: "Email and Password is wrong", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);

        if (!isPassEqual) {
            return res.status(403)
                .json({ message: "Wrong password", success: false });
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}

        )

        res.status(201)
            .json({
                message: "Login Successfully",
                success: true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}


module.exports = { signup, login };