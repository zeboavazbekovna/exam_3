const errorHandleWare = (err, req, res, next) => {
    console.error(err.message);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    });
  };
  
  export default errorHandleWare;
  