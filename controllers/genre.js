const Genre = require('../models/genre');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../helper/custom-error');

const getAllGenre = asyncWrapper( async (req, res) => {
    const genre = await Genre.find({})
    res.status(200).json({genre})
})

const createGenre = asyncWrapper( async (req, res) => {
    const genre = await Genre.create(req.body)
    res.status(201).json({genre})
})

const getGenre = asyncWrapper( async (req, res, next) => {
    const {slug:GenreSlug} = req.params
    const genre = await Genre.findOne({slug:GenreSlug});

    if(!genre){
        return next(createCustomError(`Genre not found with Slug : ${GenreSlug}`,404));
    }
    
    res.status(200).json({genre})
})

const deleteGenre = asyncWrapper( async (req, res) => {
    const {slug:GenreSlug} = req.params
    const genre = await Genre.findOneAndDelete({slug:GenreSlug});

    if(!genre){
        return next(createCustomError(`Genre not found with Slug : ${GenreSlug}`,404));
    }
    
    res.status(200).json({genre, status:'delete success'})
})

const updateGenre = asyncWrapper( async (req, res) => {
    const {slug:GenreSlug} = req.params
    const genre = await Genre.findOneAndUpdate({slug:GenreSlug}, req.body, {
        new:true,
        runValidators: true,
    })

    if(!genre){
        return next(createCustomError(`Genre not found with Slug : ${GenreSlug}`,404));
    }

    res.status(200).json({genre, status:'update success'})
})

module.exports = {
    getAllGenre,
    createGenre,
    getGenre,
    updateGenre,
    deleteGenre,
}