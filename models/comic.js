const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ComicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert a title']
    },
    alternativeTitle: {
        ind: [{
            type: String,
            required: false
        }],
        eng: [{
            type: String,
            required: false
        }],
        jpn: [{
            type: String,
            required: false
        }]
    }, 
    slug: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true
    },
    genre: [{
        type: Schema.Types.ObjectId, 
        ref: 'genre'
    }],
    cover: {
        onlinePath : {
            type: String,
            required: false
        },
        otherPath : {
            type: String,
            required: false
        }
    },
    rating: {
        type: String,
        default: 0.0
    },
    desc: {
        type: {
            type: String,
            required: true
        },
        published: {
            type: String,
            required: true
        },
        // author: {
        //     type: String,
        //     required: true
        // },
        // synopsis: {
        //     type: String,
        //     required: true
        // },
    },
    isPublished: {
        type: Boolean, 
        default: false
    },
})

module.exports = mongoose.model("comic", ComicSchema)