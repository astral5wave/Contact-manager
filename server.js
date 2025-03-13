const express= require("express");
const donenv= require("dotenv").config();
const errorHandler= require("./Middleware/errorHandler");
const connectDb = require("./config/dbConnection");

const app= express();                                 //server created
connectDb();                                           // database connection
const PORT = process.env.PORT || 5000;

app.use(express.json());         //body parser (convert body into json redable format)


app.use("/api/contact",require("./routes/contactRouter"));  //router mounted to "./routes/contactRouter" url
                                                            //if req url have /api/contact then the req is transfered to router at "./routes/contactRouter" location.  router used as middelware to check the url for routing
app.use("/api/user",require("./routes/userRouter"));

app.use(errorHandler);                  // server willl look for error handler when an error occured in express app

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
    // res.status(200).json({name:"Avanish"});
})

app.listen(PORT,()=>{
    console.log(`Server at port ${PORT}`);
})
