const express=require("express")

const app= express();



app.get("/user",(req,res)=>{
    res.send({firstName: "Divyanshi"} )
})
app.post("/user",(req,res)=>{
    res.send("Data Saved Successfullu")
})

app.delete("/user",(req,res)=>{
    res.send("User Deleted ")
})
app.get("/a(bc)?d",(req,res)=>{
    res.send("a(bc)?d" )
})

app.get("/ab*c",(req,res)=>{
    res.send("abbbbbbbbbbc" )
})


app.get(/.*fly$/,(req,res)=>{
    res.send("Ends with fly" )
})

app.get("/user/:userId/:password",(req,res)=>{
    console.log(req.params)
    res.send("query params")
})



app.listen(2000,()=>{
    console.log("Server listening on 2000")
})

