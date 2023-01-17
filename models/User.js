const mongoose=require("mongoose");

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{type:String, required: true,min:3,max:255},
    username:{type:String, required: true,min:3,max:15,unique:true},
    email:{type:String, required: true,min:6,max:255,unique:true},
    password:{type:String, required: true,min:3,max:1024},
    date:{type:Date, default:Date.now},
});

module.exports= mongoose.model("User",UserSchema);