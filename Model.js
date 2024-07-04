let mongoose=require('mongoose');
let Schema=new mongoose.Schema({
    quizzId:{type:String},
    email:{type:String},
    ques:{type:Array},
    customExpireField: {
        type: Date,
        default: Date.now,
        expires: 3600*6 // 1 hour
    }
})
let model=mongoose.model("QuizzQuestions",Schema);
module.exports={model}