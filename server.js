let express=require('express');
let app=express();
let cors=require('cors');
let mongoose=require('mongoose');
let {model}=require('./Model');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.post('/getQuizz',async(req,res)=>{
    console.log("Gotcha");
    let data=req.body;
    console.log(data.ques);
    data.ques.forEach(question => {
        question.QuizzOptions = question.QuizzOptions.filter(option => option !== '');
    });
    console.log(data);
    try{
        let result=await model.findOne({quizzId:req.body.quizzId});
        console.log(result);
        if(result==null){
            await model.create(data);
            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
app.post('/fetchQuizz',async (req,res)=>{
    console.log("endPoint Gained");
    console.log(req.body);
    try{
        let data=await model.findOne(req.body);
        (data!=null)?res.status(200).json(data.ques):res.sendStatus(404);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
app.post('/results',async(req,res)=>{
    console.log("result Data");
    console.log(req.body);
    let userAnswer=req.body.result;
    try{
    let realAnswer=await model.findOne({quizzId:req.body.quizzId});
    console.log("Result real answer");
    console.log(realAnswer.ques);
    let mark=0;
        for(let i=0;i<realAnswer.ques.length;i++){
            let resultData2=realAnswer.ques[i].QuizzAnswer.sort();
            let resultData1=userAnswer[i].sort();
            if(resultData2+""==resultData1+""){
                mark++;
            }
        }
        console.log(mark);
        res.status(200).json({result:mark})
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})
mongoose.connect('mongodb+srv://sanjaysoman46:sanjay123@aspirenex.ibkw6hj.mongodb.net/?retryWrites=true&w=majority&appName=AspireNex').then(()=>app.listen(8080,()=>console.log("Connected to Server"))).catch(err=>console.log(err,"\nServer Error"))