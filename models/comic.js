const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    title: String,
    published: Boolean,
    slug: String,
})

module.exports = mongoose.model("comic", ComicSchema)