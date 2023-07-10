const mongoose=require("mongoose");


const orderSchema=new mongoose.Schema({

//     {
//         _id: ObjectId,
//         user : { type: ObjectId, ref: 'User' },
//         restaurant : { type: ObjectId, ref: 'Restaurant' },
//       items: [{
//         name: String,
//         price: Number,
//         quantity: Number
//       }],
//       totalPrice: Number,
//       deliveryAddress: {
//         street: String,
//         city: String,
//         state: String,
//         country: String,
//         zip: String
//       },
//       status: String // e.g, "placed", "preparing", "on the way", "delivered"
//    }
      
    user : { type: ObjectId, ref: 'user' },
    restaurant : { type: ObjectId, ref: 'restaurant' },
    items: [{
    name: {type:String,required:true},
    price: {type:Number,required:true},
    quantity: {type:Number,required:true}
   }],
  totalPrice: {type:Number,required:true},
  deliveryAddress: {
    street: {type:String,required:true},
    city: {type:String,required:true},
    state: {type:String,required:true},
    country: {type:String,required:true},
    zip: {type:String,required:true}
  },
  status: {type:String,enum:["placed", "preparing", "on the way", "delivered"],default:"preparing",required:true} // e.g, "placed", "preparing", "on the way", "delivered"

    
      
});


const ordermodel=mongoose.model("order",orderSchema);

module.exports=ordermodel