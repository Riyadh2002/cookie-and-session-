const express=require("express")
const userModel= require("./mongoose")
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.send("im running")
})


app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000")
})