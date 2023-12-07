const  mongoose=require('mongoose')
const connectdatabase =()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Todo")
    .then((data)=>{
    console.log(`mongodb connected with host ${data.connection.host}`)})
    
    .catch((err)=>{
        console.log(err)
    })

}

module.exports= connectdatabase;