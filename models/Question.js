const mongoose=require("mongoose");

const {Schema}=mongoose;

const QuestionSchema=new Schema({
    title:{type:String, required: true,min:3,max:255},
    content:{type:String, required: true,min:6,max:255},
    img:{type:String,required:false,max:1024,default:""},
    score:{type:Number, default:0},
    userId:{type:Schema.Types.ObjectId, ref:"User",default: undefined},
    date:{type:Date, default:Date.now},
});

module.exports= mongoose.model("Question",QuestionSchema);