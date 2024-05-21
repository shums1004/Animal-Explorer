const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function register(req, res) {
    try {
    const { username, email, password } = req.body;
    console.log("inside register");
    const emailExist = await User.findOne({email});
    const usernameExist = await User.findOne({username});
    if (emailExist || usernameExist) return res.status(400).send('Email or Username already exists');

    // // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        document:[]
    });

        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('Username is not found');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        return res.header('auth-token', token).send(token);
    } catch (err) {
        return res.status(500).send(err);
    }
}

const authenticateToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};



module.exports = { register, login, authenticateToken };



