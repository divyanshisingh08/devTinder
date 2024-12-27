const express=require("express")

const app= express();

//ROUTES

// app.get("/user",(req,res)=>{
//     res.send({firstName: "Divyanshi"} )
// })
// app.post("/user",(req,res)=>{
//     res.send("Data Saved Successfullu")
// })

// app.delete("/user",(req,res)=>{
//     res.send("User Deleted ")
// })
// app.get("/a(bc)?d",(req,res)=>{
//     res.send("a(bc)?d" )
// })

// app.get("/ab*c",(req,res)=>{
//     res.send("abbbbbbbbbbc" )
// })


// app.get(/.*fly$/,(req,res)=>{
//     res.send("Ends with fly" )
// })

// app.get("/user/:userId/:password",(req,res)=>{
//     console.log(req.params)
//     res.send("query params")
// })


//ROUTE HANDLERS & MIDDLEWARES

app.use(
    "/user",

    (req,res,next)=>{
        console.log("Handling Route handler 1")
        // res.send("Response 1"),
    next()
    },

    
 [ (req,res,next)=>{
        console.log("Handling Route handler 2")
        // res.send("Response 2"),
        next()
    },

    (req,res,next)=>{
        console.log("Handling Route handler 3")
        res.send("Response 3"),
        next()
    }],
    
    (req,res,next)=>{
        console.log("Handling Route handler 4")
        // next()
      
    }
    

   )

//We can write this route handle as any of them
/**
 * app.use("/user",RouteHandler1,RouteHandler2,RouteHandler3,RouteHandler4)
 * app.use("/user", [RouteHandler1,RouteHandler2,RouteHandler3,RouteHandler4])
 * app.use("/user", [RouteHandler1],RouteHandler2,RouteHandler3,RouteHandler4)
 * app.use("/user", [RouteHandler1,RouteHandler2],RouteHandler3,RouteHandler4)
 * app.use("/user", RouteHandler1,[RouteHandler2,RouteHandler3,RouteHandler4])
 */



app.listen(2000,()=>{
    console.log("Server listening on 2000")
})





/**
 * 
 * GET /users: It will go through all the app.xxx("matching route") functions until it reaches the function that sends the response back. 
        The function that sends the response is called the Request Handler.
        All the functions it passes through along the way are called Middlewares.
 * 
 * 
 *  Whenever you make an API call , it goes through middleware chain and finally it goes to Request Handler (The function which is sending response back)
 * 
 * The job of express js is - to take request and send response back
 */