export const errorBuilder =(err,req,res,next)=>{
    err.message=err.message || 'server not found'
    err.statusCode=err.statusCode || 401
    console.log(err.message)

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
     
    
    })

}