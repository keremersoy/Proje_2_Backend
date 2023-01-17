const mongoose=require("mongoose");

const {Schema}=mongoose;

const TeamSchema=new Schema({
    ownerId:{type:Schema.Types.ObjectId, ref:"User"},
    title:{type:String, required: true,min:3,max:30},
    content:{type:String, required: true,min:3,max:255},
    members:{type: [Schema.Types.ObjectId],default: undefined},
    requests:{type: [Schema.Types.ObjectId],default: undefined},
    date:{type:Date, default:Date.now},
});

module.exports= mongoose.model("Team",TeamSchema);