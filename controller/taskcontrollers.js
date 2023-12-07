const taskslist = require('../Model/task');
const { ErrorHandler } = require('../middleware/error');
// Add New Task
exports.newtask = async(req,res, next) => {
    try{
        const {title, description} = req.body
        await taskslist.create({
            title,
            description,
            user:req.user
        });
        next(new  ErrorHandler("Task Added Succesfully",201))
    } catch(error){
        next(error)
    }

}
// Get Task
exports.getmytask = async(req,res, next)=>{
    try{
        const userid= req.user._id
        const showtask= await taskslist.find({user:userid})
        res.status(200).json({
    message:"All task ta",
    showtask
        })
    }
    catch(error){
        next(error)
    }
  
}
//UpdateTask
exports.updatetask= async ( req, res, next)=>{
    try{
        let task= await taskslist.findById(req.params.id)
        if(!task) return  next(new  ErrorHandler("Task Not Found" ,404))
    
    
        task.isCompleted=!task.isCompleted;
        await task.save()
         next(new ErrorHandler("update has been class done" , 200));
    } catch(error){
        next(error)
    }
 
}
//Deletetask
exports.deletetask= async(req, res, next) => {
try{
    const deletetask= await taskslist.findById(req.params.id)

    if(!deletetask){ 
        return next(new ErrorHandler("Ivalid Id",404));
}
     await  deletetask.deleteOne();
     next(new  ErrorHandler("Task Has Been Deleted ",204))
} catch(error){
    next(error)
}
   
}
// 