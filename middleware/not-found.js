const notFound = (req, res) => {
    try {
        res.status(404).send('route does not exist')
    }catch (err) {
        res.status(500).json({msg : err})
    }
}

module.exports = notFound