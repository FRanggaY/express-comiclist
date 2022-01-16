const Comic = require('../models/comic');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../helper/custom-error');

const getAllComic = asyncWrapper( async (req, res) => {
    const data = await Comic.find({}, 'title slug cover isPublished rating').populate('genre')
    // res.status(200).json({status:'success', data:{comic, nbHits:comic.length} })
    // res.status(200).json({comic, amount:comic.length})
    res.status(200).json({status:'Success', data, total:data.length })
})

const createComic = asyncWrapper( async (req, res) => {
    const comic = await Comic.create(req.body)
    res.status(201).json({comic})
})

const getComic = asyncWrapper( async (req, res, next) => {
    // const {id:ComicId} = req.params
    const {slug:ComicSlug} = req.params
    // const comic = await Comic.findOne({_id:ComicId});
    const comic = await Comic.findOne({slug:ComicSlug});

    if(!comic){
        // const error = new Error('Not Found');
        // error.status = 404;
        // return next(error)
        return next(createCustomError(`Comic not found with Slug : ${ComicSlug}`,404));
    }
    
    res.status(200).json({comic})
})

const deleteComic = asyncWrapper( async (req, res) => {
    // const {id:ComicId} = req.params
    const {slug:ComicSlug} = req.params
    // const comic = await Comic.findOneAndDelete({_id:ComicId});
    const comic = await Comic.findOneAndDelete({slug:ComicSlug});

    if(!comic){
        return next(createCustomError(`Comic not found with Slug : ${ComicSlug}`,404));
    }
    
    // res.status(200).json({comic})
    res.status(200).json({comic, status:'delete success'})
})

const updateComic = asyncWrapper( async (req, res) => {
    const {slug:ComicSlug} = req.params
    const comic = await Comic.findOneAndUpdate({slug:ComicSlug}, req.body, {
        new:true,
        runValidators: true,
    })

    if(!comic){
        return next(createCustomError(`Comic not found with Slug : ${ComicSlug}`,404));
    }

    res.status(200).json({comic, status:'update success'})
})

module.exports = {
    getAllComic,
    createComic,
    getComic,
    updateComic,
    deleteComic,
}