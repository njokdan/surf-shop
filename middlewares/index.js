module.exports = {
    // High-order function to handle errors from functions
    errorHandler(fn) {
        return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
    }
} 