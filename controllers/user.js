const User = require('../models/user');
const asyncWrapper = require('../middleware/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
// const {createCustomError} = require('../helper/custom-error');

const createUser = asyncWrapper( async (req, res) => {
    const { name, email, password } = req.body;

    if(!(email && password && name)){
        res.status(400).send("All input is required")
    }

    const oldUser = await User.findOne({email});

    if(oldUser) {
        res.status(201).send("User Already Exist. Please Login")
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword
    })

    res.status(201).json({data: [user.name, user.email]})

})


const loginUser = asyncWrapper( async (req, res) => {
    const { email, password } = req.body;

    if(!(email && password)){
        res.status(400).send("All input is required")
    }

    const user = await User.findOne({email});

    if(user && user.token){
        res.status(201).json({user, status: 'Already login'});
    }
    else{
        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET);
            user.token = token;
            const newUser = await user.save();
            newUser === user;
    
            res.status(201).json({user});
        }
        else{
            res.status(400).send("Invalid Credential or Something Wrong")
        }
    }
})

const logoutUser = asyncWrapper( async (req, res) => {
    const { token } = req.body;

    if(!(token)){
        res.status(400).send("All input is required")
    }

    const user = await User.findOne({token}).select("-password");

    if(user) {
        user.token = "";
        const newUser = await user.save();
        newUser === user;

        res.status(201).json({user});
    }
    else{
        res.status(400).send("Not Found")
    }
    
})

module.exports = {
    createUser,
    loginUser,
    logoutUser
}