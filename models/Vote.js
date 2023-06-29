const mongoose=require("mongoose");

const {Schema}=mongoose;

const UserSchema=new Schema({
    replyId:{type:Schema.Types.ObjectId, ref:"Reply"},
    userId:{type:Schema.Types.ObjectId, ref:"User"},
    vote:{type:Number},
});

module.exports= mongoose.model("Vote",UserSchema);