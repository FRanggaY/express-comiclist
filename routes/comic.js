const express = require('express')
const router = express.Router();

const {
    getAllComic,
    createComic,
    getComic,
    updateComic,
    deleteComic,
} = require('../controllers/comic')

router.route('/').get(getAllComic).post(createComic)
router.route('/:slug').get(getComic).patch(updateComic).delete(deleteComic)

module.exports = router