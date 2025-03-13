const errorHandler = (err, req, res, next) => {
    res.json({ "error": "Error occured", message: err.message, stack: err.stack })
}
module.exports = errorHandler;