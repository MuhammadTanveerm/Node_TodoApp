const express = require('express');
const cookieParser= require('cookie-parser')
const app= express();
app.use(express.json());
app.use(cookieParser());
//Import Route
const user=require("./routes/userroute.js");
const tasks = require("./routes/taskrouter.js");
const cors =require("cors")
const { errmiddleware } = require('./middleware/error.js');


app.use("/api/v1", user)
app.use("/api/v1", tasks)
app.use( cors({  
        origin:[process.env.FRONTEND_URL],
        methods :["GET", "POST", "PUT", "DELETE"],
     credentials: true,
    })
    )
app.use(errmiddleware)
  
// app.use((err, req, res, next) => {
//       return res.status(404).json({
//             success:false,
//             message: err.message,
// });
    
// });
module.exports = app