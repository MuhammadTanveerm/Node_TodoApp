const User = require("../Model/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../middleware/error");
const { sendCookie } = require("../utils/feactures.js");

// exports.userget=async (req, res)=>{
//     const userget = await User.find()

//     res.status(200).json({
//          messge:" our controller is working accurate without any confusion",
//          userget

//         } )
// }

// exports.userone= async (req, res)=>{

//     let c= await User.findById(req.params.id);

//         if(!c) {
//              return res.status(500).json({
//                 success:"false",
//                 message:"user not found "
//         } )
//     }
//    res.status(200).json({
//     success:"true",
//     c
//    })
//     }
// exports.userupdate= async (req, res)=>{

//     let c= await User.findById(req.params.id);

//         if(!c) {
//              return res.status(500).json({
//                 success:"false",
//                 message:"user not found "
//         } )
//     }
// c=await User.findByIdAndUpdate(req.params.id, req.body,{
//     new:true,
//     useFindAndModify:false,
//     runValidators:true,
// })

//         res.status(200).json({
//             message:"update successfulll"  ,
//             c
//         } )
//     }
// exports.userdelete= async (req, res)=>{

// const c= await User.findById(req.params.id);

//     if(!c) {
//          return res.status(500).json({
//             success:"false",
//             message:"user not found "
//     } )
// }
//     await c.deleteOne();
//     res.status(200).json({
//         message:"User remove successfully"
//     } )
// }

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exit M", 404));
    }
    const hashpassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashpassword });
    sendCookie(user, res, "Registered succesfully sendcookis", 201);
  } catch (error) {
    next(error);
  }
};

// Login User

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid Password and Email M", 404));

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched)
      return next(new ErrorHandler("Invalid Password  and Email M", 404));

    sendCookie(user, res, `welcome using cookiw, ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

// get my profile
exports.getprofile = (req, res) => {
  res.status(200).json({
    success: true,
    User: req.user,
  });
  // res.status(201).cookie("token",token,{
  //     httponly: true,
  //     maxAge:15 * 60 * 1000}).json({

  // })
};
//log out
exports.logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "node",
        secure: process.env.NODE_ENV === "Development"  ? false : true, })
    .json({
      success: false,
      message: `Logout  bhag jao`,
    });
};
