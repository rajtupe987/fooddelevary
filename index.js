const express=require("express");

const {connection}=require("./config/db")
const app=express();

const userRoute=require("./routes/userroute");
const restoRoute=require("./routes/restrorentroute");
const orderRoute=require("./routes/orderroute")
const Authenticator=require("./middleware/Authentication");

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to Fooddelevery app")
})


 //app.use("/api",Authenticator)
app.use("/api",userRoute)
app.use("/api",restoRoute)
app.use("/api",orderRoute)
app.listen(process.env.port,async()=>{
   try {
    await connection;
    console.log("connected to db..")
   } catch (error) {
    console.log(error.message)
   }
   console.log(`port is running at ${process.env.port}`)
}) 