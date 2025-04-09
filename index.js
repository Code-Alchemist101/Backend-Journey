const express = require("express");
const app = express();

const users =[{
    name: 'John Doe',
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json())

app.get("/",function(req,res){
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;

    function findHealthyKidneys(kidney){
        return kidney.healthy;
    }

    const numberOfHealthyKidneys = johnKidneys.filter(findHealthyKidneys).length;
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/",function(req,res){
    if(checkForUnHealthyKidney()){
        function changeToHealthyKidneys(kidney){
            if(!kidney.healthy){
                kidney.healthy = true;
            }
        }
        users[0].kidneys.map(changeToHealthyKidneys);
        res.json({});
    } else {
        res.status(411).json({
            msg: "No unhealthy kidneys"
        })
    }
})

app.delete("/",function(req,res){
    if(checkForUnHealthyKidney()){
        const newKidneys = [];
        function removeUnHealthyKidneys(kidney){
            if(kidney.healthy){
                newKidneys.push({
                    healthy: true
                });
            }
        }
        users[0].kidneys.forEach(removeUnHealthyKidneys);
        users[0].kidneys = newKidneys;
        res.json({});
    } else{
        res.status(411).json({
            msg: "You have no bad kidneys"
        })
    }
});

function checkForUnHealthyKidney(){
    let atleastOneUnHealthyKidney = false;
    users[0].kidneys.forEach(function(kidney){
        if(!kidney.healthy){
            atleastOneUnHealthyKidney = true;
        }
    });
    return atleastOneUnHealthyKidney;
}

app.listen(3000);