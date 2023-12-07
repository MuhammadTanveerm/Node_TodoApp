const jwt = require("jsonwebtoken")
// const user =require('../Model/usermodel.js')
const sendCookie = (user, res, message, statuscode= 200) => {
    const token= jwt.sign({ _id: user._id }, process.env.JWT);

console.log(process.env.NODE_ENV  ),
console.log(process.env.NODE_ENV === "Development" ),
    res.status(statuscode).cookie("token", token, {
        httponly: true,
        maxAge:15 * 60 * 1000,
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "node",
        secure: process.env.NODE_ENV === "Development"  ? false : true,
    }).json({
        success:true,
        message,
    }); 
};

module.exports={sendCookie}