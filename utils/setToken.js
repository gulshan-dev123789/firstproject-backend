export const setToken =(res,user,message,statusCode=201)=>{
 

    const token =user.jwtToken()
    // console.log(token)
    const option={
        expires: new Date(Date.now()+10*24*60*60*1000) ,
        httpOnly:true,
        // secure:false,
       
          

    }

    res.status(statusCode).cookie('token',token,option).json({
        success:true,
        user,
        message,
      
    })


}