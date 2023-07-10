

const jwt=require("jsonwebtoken");
require("dotenv").config()

const Authenticator=async(req,res,next)=>{
//  try {
     const token=req.headers.authorization;
    //console.log(token)
      if(token){
        jwt.verify(token,process.env.secret_key,(err,decoded)=>{
                if(decoded){
                    req.body.userId=decoded.userId;
                    next();
                }else{
                    res.send(err)
                }
        });
      }else{
        res.send({"msg":"token not found"})
      }

//  } catch (error) {
//     console.log("jwt error")
//     res.status(400).send({"msg":error.message})
//  } 
}


module.exports=Authenticator
