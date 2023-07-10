const express=require("express");

const userModel=require("../modal/user.model")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const userRoute=express.Router();

require("dotenv").config();


// userRoute.get("/",async(req,res)=>{
//     try {
//         const data=await userModel.find();
//         res.send(data)
//     } catch (error) {
//         res.send(error)
//     }
// })


userRoute.post("/register",async(req,res)=>{
    try {
        const {name,email,password,address: {street,city,state,country,zip}}=req.body;

        const user=await userModel.findOne({email});

        if(user){
            res.status(400).send({"msg":"user with this email already present.."})
        }else{
            const hashpass=await bcrypt.hashSync(password,5);

            const anotherUser=new userModel({name,email,password:hashpass,address: {street,city,state,country,zip}});

            await anotherUser.save()
            return res.status(201).send({"msg":"registerd seccessfully",user:anotherUser})
        }


    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})



userRoute.post("/login",async(req,res)=>{
    try {
        const payload=req.body;
        const validateUser=await userModel.findOne({email:payload.email});

        if(!validateUser){
            return res.status(400).send({"msg":"You are not resgistred."})
        }
       //console.log(validateUser)
        const check_pass=await bcrypt.compare(
            payload.password,
            validateUser.password
            
            );
          //console.log(check_pass)

        if(check_pass){
            console.log(process.env.secret_key)
            //console.log(validateUser.email,validateUser._id)
             let token=jwt.sign({email:validateUser.email,userId:validateUser._id},process.env.secret_key);
              //console.log(token)
            res.status(201).send({"msg":"login success.",token})
        
         }else{
        res.send({"msg":"Invalid details..."})
        }
    } catch (error) {
        console.log("bad req error")
         res.status(400).send({"msg":error.message})
    }
})


userRoute.patch("/user/:id/reset",async(req,res)=>{
    const userid=req.params.id;
    const {email,password}=req.body;
    try {

             

        const hashpass=await bcrypt.hashSync(password,5);

       const data= await userModel.findByIdAndUpdate({_id:userid,password:hashpass},{email,password:hashpass});
       
       
       
       res.status(204).send({"msg":"data reset success",data})
    } catch (error) {
        res.status(400).send({"msg":error.messge})
    }
})
module.exports=userRoute