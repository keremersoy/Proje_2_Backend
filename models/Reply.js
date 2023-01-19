const mongoose=require("mongoose");

const {Schema}=mongoose;

const ReplySchema=new Schema({
    parentId:{type:Schema.Types.ObjectId, ref:"Question",default: undefined},
    userId:{type:Schema.Types.ObjectId, ref:"User",default: undefined},
    content:{type:String, required: true,min:6,max:255},
    score:{type:Number, default:0},
    date:{type:Date, default:Date.now},
});

module.exports= mongoose.model("Reply",ReplySchema);