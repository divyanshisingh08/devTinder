const express=require("express")

const app= express();

app.listen(2000,()=>{
    console.log("Server listening on 2000")
})

app.use("/test",(req,res)=>{
    res.send("Hello from 2000 test")
})
app.use("/watch",(req,res)=>{
    res.send("Hello from 2000 test")
})
app.use((req,res)=>{
    res.send("Hello from 2000")
})
