const express=require("express")

const app= express();
const {adminAuth}= require("./middlewares/auth")

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

// app.use(
//     "/user",

//     (req,res,next)=>{
//         console.log("Handling Route handler 1")
//         // res.send("Response 1"),
//     next()
//     },

    
//  [ (req,res,next)=>{
//         console.log("Handling Route handler 2")
//         // res.send("Response 2"),
//         next()
//     },

//     (req,res,next)=>{
//         console.log("Handling Route handler 3")
//         res.send("Response 3"),
//         next()
//     }],
    
//     (req,res,next)=>{
//         console.log("Handling Route handler 4")
//         // next()
      
//     }
//    )


//USE OF MIDDLEWARES
//  app.get(
//     "/admin/getAllData",
//     (req,res,next)=>{
        
//         //Logic to check if request is authorized
//         const token="xyz";
//         const isAuthorized =token=="zyz"
//         if(isAuthorized){
//             res.send("All Data Sent")
//         }
//         else {
//             res.status(401).send("Unauthorized Request")
//         }

//  })


//  app.get(
//     "/admin/deleteUser",
//     (req,res,next)=>{

//         //Logic to check if request is authorized
//         const token="xyz";
//         const isAuthorized =token=="zyz"
//         if(isAuthorized){
//             res.send("User Deleted")
//         }
//         else {
//             res.status(401).send("Unauthorized Request")
//         }

//  })




/**
 * We are implementing logic of admin again and again that is where middleware comes into picture. 
 * 
 * 
 * Generally we use - app.use to write middleware so that all the request coming to a particular routes is handled by it first then will move to next handler ,
 * 
 * 
 * what we can do is - first we will write the Auth logic then if user is not authorized then throw error from there itseld and if admin is authorized then
 * move to using next()
 */




app.use("/admin",
    adminAuth)

app.get("/admin/getAllData",
(req,res)=>{
  res.send("All Data Sent")  
})

app.delete("/admin/deleteUser",
    (req,res)=>{
      res.send("User Deleted")  
    })






app.listen(2000,()=>{
    console.log("Server listening on 2000")
})





