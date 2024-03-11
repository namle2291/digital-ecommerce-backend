function notFoundHandler(req, res, next) {
  const error = new Error(`Route ${req.originalUrl} not found!`);
  res.status(404);
  next(error);
}

function handlerError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
}

module.exports = { notFoundHandler, handlerError };
