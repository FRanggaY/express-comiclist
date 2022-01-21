const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth");

const {
    getAllComic,
    createComic,
    getComic,
    updateComic,
    deleteComic,
} = require('../controllers/comic')

router.route('/').get(getAllComic).post(auth, createComic)
router.route('/:slug').get(getComic).patch(auth, updateComic).delete(auth, deleteComic)

module.exports = router