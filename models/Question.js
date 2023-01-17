const mongoose=require("mongoose");

const {Schema}=mongoose;

const QuestionSchema=new Schema({
    title:{type:String, required: true,min:3,max:255},
    content:{type:String, required: true,min:6,max:255},
    img:{type:String,max:1024,default:null},
    score:{type:Number, default:0},
    userId:{type:Schema.Types.ObjectId, ref:"User"},
    date:{type:Date, default:Date.now},
});

module.exports= mongoose.model("Question",QuestionSchema);