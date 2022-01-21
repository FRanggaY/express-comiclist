const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        unique: true
    },
    email: {
        type: String, 
        unique: true
    },
    password: {
        type: String, 
        private: true
    },
    token: {
        type: String
    },
    role: {
        type: String, 
        required: false
    }

})

module.exports = mongoose.model("user", UserSchema)