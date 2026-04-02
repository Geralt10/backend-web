const express = require("express");

const app = express();

app.use(express.json());

const notes=[];

app.post("/notes",(req,res)=>{
    notes.push(req.body)
    console.log("note created");
    
    
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.delete("/notes/:index",(req,res)=>{

    delete notes[req.params.index];

    res.status(200).json({
        message:"data deleted successfully"
    })

})

app.patch("/notes/:index",(req,res)=>{
    
    notes[req.params.index].description=req.body.description;

    res.status(200).json({
        message:"description modified"
    })
})


module.exports=app