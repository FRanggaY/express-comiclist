const express = require('express')
const router = express.Router();

const {
    getAllGenre,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
    // auth for update,delete
} = require('../controllers/genre')

router.route('/').get(getAllGenre).post(createGenre)
router.route('/:slug').get(getGenre).patch(updateGenre).delete(deleteGenre)

module.exports = router