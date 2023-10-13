const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code provided
  const message = err.message || "Internal Server Problem";

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = errorMiddleware;
