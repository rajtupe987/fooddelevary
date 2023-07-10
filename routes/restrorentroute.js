const express=require("express");

const restomodel=require("../modal/restorent.model")

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const restoRoute=express.Router();

require("dotenv").config();


restoRoute.get("/restaurants",async(req,res)=>{
    try {
        const data=await restomodel.find();
        res.status(200).send(data)
    } catch (error) {
        res.send(error)
    }
})


restoRoute.post("/restaurants",async(req,res)=>{
    try {
        const {name,address,menu}=req.body;

            const restorents=new restomodel({name,address,menu});

            await restorents.save()
            return res.status(200).send({"msg":"registerd seccessfully",restro:restorents})
        

    } catch (error) {
        res.status(400).send({"msg":error.message});
    }
})



restoRoute.get("/restaurants/:id",async(req,res)=>{
    const userid=req.params.id;
    try {
       const data= await restomodel.findById({_id:userid});
       
       res.status(200).send({"msg":"success",data})
    } catch (error) {
        res.status(400).send({"msg":error.messge})
    }
})

restoRoute.get("/api/restaurants/:id/menu",async(req,res)=>{
    const userid=req.params.id;
    try {
       const data= await restomodel.findById({_id:userid});
       
       res.status(201).send({"msg":"success",data})
    } catch (error) {
        res.status(400).send({"msg":error.messge})
    }
})


restoRoute.post('/restaurants/:id/menu', (req, res) => {
    const { m_name, description, price, image } = req.body;
    const { id } = req.params;
  
    restomodel.findById(id)
      .then(restaurant => {
        if (!restaurant) {
          return res.status(404).json({ error: 'Restaurant not found' });
        }
  
        const menuItem = {m_name,description,price,image};
  
        restaurant.menu.push(menuItem);
  
        return restaurant.save();
      })
      .then(updatedRestaurant => {
        res.status(201).json(updatedRestaurant);
      })
      .catch(error => {
        res.status(500).json({ error: 'Failed to add menu item' });
      });
  });
  

  restoRoute.delete('/restaurants/:id/menu/:menuid', async (req, res) => {
    const { id, menuid } = req.params;
  
    try {
      const restaurant = await restomodel.findByIdAndUpdate(id,{$pull:{menu: { _id:menuid }}});
  
      if (!restaurant) {
        return res.status(400).json({ "msg": 'Restaurant not found' });
      }
  
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ "msg": 'Failed to delete menu item' });
    }
  });

module.exports=restoRoute;
