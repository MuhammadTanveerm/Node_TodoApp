const app= require('./app')
const connection= require('./config/database.js')
const dotenv=require('dotenv')

//Config
dotenv.config({path:"./config/config.env"})
///Database Coonection
connection()
app.listen(process.env.PORT,()=>{
console.log(`server is running on ${process.env.PORT} in ${process.env.NODE_EnV} Mode`)
})