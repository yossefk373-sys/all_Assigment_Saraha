import  express from "express";
import connectDB from "./DB/connectionDB.js";
import userrouter from "./module/user/user.controller.js";
import cors from "cors"
import { connectredis } from "./DB/connectionredis.js";
const app=express();
const port=3000

const bootstrap=async()=>{
    app.use(express.json());
 
    app.use(cors({
        origin:"*"
    }))


await connectDB()
await connectredis()


app.use("/user",userrouter)



app.get("/",(req,res)=>{   
    res.send("welcome to my app ")
})

app.use("{/*demo}",(req,res)=>{
res.status(404).send(`url: ${req.originalUrl} not found`)
})

app.use((err,req,res,next)=>{
    res.status(err.cause||500).json({msg:err.message,stack:err.stack})
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
}
export default bootstrap;