const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "USER ALREADY EXISTS" });
        }

        const user = await User.create({
            name,
            email,
            password,
        
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
               
            });
        } else {
            res.status(400).json({ message: "Error occurred while creating user" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Authenticate existing user
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                pic: user.pic
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, authUser };
