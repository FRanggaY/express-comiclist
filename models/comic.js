const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ComicSchema = new mongoose.Schema({
    title: String,
    published: Boolean,
    slug: {type: String, unique: true},
    genre: [
        {type: Schema.Types.ObjectId, ref: 'genre'}
    ],
    isPublished: {type: Boolean, default: false},
})

module.exports = mongoose.model("comic", ComicSchema)