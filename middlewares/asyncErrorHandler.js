export const asyncErrorHandler = (checkError)=> (req,res,next)=>{
    Promise.resolve(checkError(req,res,next)).catch(next)

}