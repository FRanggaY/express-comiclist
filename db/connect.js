const mongoose = require('mongoose')

const connectDB = (url) => {
    return mongoose
    .connect(url, {
        //comment if not using V6
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database')
    }).catch(err => {
        console.log('Failed to connect to the database', err)
    })
}

module.exports = connectDB