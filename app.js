const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
const query=req.body.cityName;
const appid="7a623a23f22eeda545e11f5793914966";
const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
https.get(url,function(respond){
console.log(respond.statusCode);
respond.on("data",function(data){
  const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp;
  const weatherFeel=weatherData.main.Feels_like;
  const weatherDescription=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
  console.log(temp);
  console.log(weatherFeel);
  console.log(weatherDescription);
  res.write("<p>The weather is currently "+weatherDescription+"</p>");
  res.write("<img src="+imageURL+">");
  res.write("<h1>The temperature of "+query+" is "+temp+" degrees celsius</h1>");
  res.send();
});
});
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
