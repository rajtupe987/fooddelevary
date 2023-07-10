const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({

    // {
    //     _id: ObjectId,
    //     name: String,
    //     email: String,
    //     password: String,
    //     address: {
    //       street: String,
    //       city: String,
    //       state: String,
    //       country: String,
    //       zip: String
    //     }
    //   }


        name: {type:String,required:true},
        email: {type:String,required:true},
        password: {type:String,required:true},
        address: {
          street: {type:String,required:true},
          city: {type:String,required:true},
          state: {type:String,required:true},
          country: {type:String,required:true},
          zip: {type:String,required:true}
        }
      
})

const userModel=mongoose.model("user",userSchema);


module.exports=userModel