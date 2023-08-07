const link = 'mongodb+srv://vinayaknawdhar003:Z8nC0gay3vDVqH8C@becauselifematters.ijulfoe.mongodb.net/?retryWrites=true&w=majority';

const mongoose = require('mongoose');
const path = require('path');
const express = require('express')
const app = express();

app.listen(5000,()=>{
    console.log("App is listening on port 5000");
})

app.use(express.static('./public'));

//Map Server
app.get('/map/map.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/map/map.html'))
})
app.get('/map/map.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'/map/map.css'))
})
app.get('/map/map.js',(req,res)=>{
    res.sendFile(path.join(__dirname,'/map/map.js'))
})

//Volunteer Server
app.get('/volunteer/volunteers.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'/volunteer/volunteers.html'))
})
app.get('/volunteer/volunteer.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'/volunteer/volunteer.css'))
})
app.get('/volunteer/volunteer.js',(req,res)=>{
    res.sendFile(path.join(__dirname,'/volunteer/volunteer.js'))
})




async function main() {
  await mongoose.connect(link);
}