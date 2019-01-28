module.exports = {
    // High-order function to handle errors from functions
    asyncErrorHandler(fn) {
        return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
    }
} 