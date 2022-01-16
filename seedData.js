const fs = require('fs');
const Comic = require('./models/comic');
const connectDB = require('./db/connect')
require('dotenv').config()

connectDB(process.env.MONGO_URL).then();

// COMIC SEEDER

const comics = JSON.parse(fs.readFileSync(`${__dirname}/_seeders/comic.json`, 'utf-8'));

const importData = async () => {
    try {
        await Comic.create(comics);
        console.log(`Data successfully imported`);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const removeData = async () => {
    try {
        await Comic.deleteMany();
        console.log(`Data successfully deleted`);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '-i') {
    importData().then();
} else if (process.argv[2] === '-d') {
    removeData().then();
}

// END COMIC SEEDER