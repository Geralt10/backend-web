const express = require("express")
const noteModel=require("./models/notes.model")
const app = express();

app.use(express.json());

app.post("/notes",async(req,res)=>{
       const {title,description}=req.body;

      const note=await noteModel.create({
        title,description
       })
        
       res.status(201).json({
        message:"note is created",
        note
       })

})

app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find();

    res.status(201).json({
        message:"data fetch successfully",
        notes
    })
})


module.exports=app