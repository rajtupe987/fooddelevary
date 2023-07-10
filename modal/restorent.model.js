const mongoose=require("mongoose");


const restroSchema=new mongoose.Schema({

    // {
    //     _id: ObjectId,
    //     name: String,
    //     address: {
    //       street: String,
    //       city: String,
    //       state: String,
    //       country: String,
    //       zip: String
    //     },
    //     menu: [{
    //       _id: ObjectId,
    //       name: String,
    //       description: String,
    //       price: Number,
    //       image: String
    //     }]
    //   }
      
    
        name: {type:String,required:true},
        address: {
          street: {type:String,required:true},
          city: {type:String,required:true},
          state: {type:String,required:true},
          country: {type:String,required:true},
          zip: {type:String,required:true}
        },
        menu: [
          {
          m_name: {type:String,required:true},
          description: {type:String,required:true},
          price: {type:Number,required:true},
          image: {type:String,required:true}
        }
      ]
    
      
});



const restomodel=mongoose.model("restaurant",restroSchema);


module.exports=restomodel;