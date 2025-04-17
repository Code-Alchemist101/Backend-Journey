const express = require('express');

const app = express();

app.use(avgReqTime, reqCounter);

let counter = 0;
function reqCounter(req,res, next){
    counter++;
    req.after = new Date().getTime();
    next();
}

function avgReqTime(req,res,next){
    req.before = new Date().getTime();
    next();
}

app.get("/", function(req,res){
    const timeTaken = req.after - req.before;
    res.send(`Counter: ${counter}, Time Taken: ${timeTaken} ms`);
})

app.listen(3000);