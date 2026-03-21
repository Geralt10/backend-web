const express = require("express");

const app = express() // server ke instance ko create krna

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.get("/home",(req,res)=>{
    res.send("this is home page")
})

app.get("/product",(req,res)=>{
    res.send("this is home product")
})

app.listen(3000)