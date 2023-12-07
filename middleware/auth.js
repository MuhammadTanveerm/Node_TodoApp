

const User = require('../Model/usermodel.js')
const jwt = require('jsonwebtoken')
exports.isauthenticated = async(req, res,next) =>{
    const { token }= req.cookies
    if(!token){
       return res.json({
            success:false,
            message:" Login First"
        })
    }
    
    const decoded=  jwt.verify(token, process.env.jWT)
    req.user = await User.findById(decoded._id);
    next();
}