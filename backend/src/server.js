import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

dotenv.config();// this file needs to config !!

const app= express();

//middlewares

app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// app.use(cors());

//import db 
import database from "./db/dbs.js";
database();


//import routes
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import chatRoute from "./routes/chat.route.js";

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/chat",chatRoute)



const Port=process.env.Port || 3001;

const __dirname= path.resolve();

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

app.listen(Port,()=>{
    console.log("server at port :",Port);
    
})