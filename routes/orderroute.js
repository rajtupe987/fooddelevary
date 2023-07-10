const express=require("express");

const ordermodel=require("../modal/order.model")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const orderRoute=express.Router();

require("dotenv").config();


orderRoute.get("/restaurants",async(req,res)=>{
    try {
        const data=await restomodel.find();
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})


orderRoute.post('/orders',async(req,res) => {
    try {
      const { user, restaurant,items,totalPrice,deliveryAddress,status } = req.body;
  
      const order =new ordermodel({
        user,
        restaurant,
        items,
        totalPrice,
        deliveryAddress,
        status
      });
  
      const newOrder=await order.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ "msg": 'Failed to place an order' });
    }
  });
  

  orderRoute.get("/orders/:id",async(req,res)=>{
    const userid=req.params.id;
    try {
       const data= await ordermodel.findById({_id:userid});
       
       res.status(201).send({"msg":"success",data})
    } catch (error) {
        res.status(400).send({"msg":error.messge})
    }
})

  module.exports=orderRoute