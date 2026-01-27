const CustomAPIError = require('../errors/customError')

const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err)

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Something went wrong on server',
  })
}

module.exports = errorHandlerMiddleware
