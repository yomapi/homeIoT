var sensorLib = require("node-dht-sensor");
const express = require('express');
const bodyParser=require('body-parser');
const app = express();



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const PORT=4500

function handleListening(){
  console.log(`listeng on ${PORT} good`)
  console.log(sensorRead());
  
}

function sensorRead(){
  var temp=sensorLib.read(22,4);
  return {
    h:temp.humidity.toFixed(1),
    t:temp.temperature.toFixed(1)
  };
}

app.listen(PORT,handleListening);

//post
function handlePost(req,res){
  const id=req.body.id;
  const pwd=req.body.pwd;
  console.log(id,pwd);
  if(id=="id1"&&pwd=="pwd1"){
      return res.send(200,`온도:${sensorRead().t}℃ 습도:${sensorRead().h}%`)
      
  }else{
    return res.send("NO LOGIN");
  }
}
app.post('/',handlePost);