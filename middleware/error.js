class ErrorHandler extends Error {
         constructor(message, statuscode) {
    super(message)
    this.statuscode = statuscode
}
}


const errmiddleware = (err, req, res, next) => {
    err.message =  err.message || "Internal Server Error";
    err.statuscode =  err.statuscode || 404;
   return  res.status(err.statuscode).json({
        success:false,
        message: err.message,
    });
};


module.exports ={ErrorHandler, errmiddleware};
// module.exports = {ErrorHandler}