const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    slug: {type: String, unique: true},
})

module.exports = mongoose.model("genre", GenreSchema)