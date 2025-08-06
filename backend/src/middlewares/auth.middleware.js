import User from "../models/User.js";
import jwt from "jsonwebtoken";

const protectRoute=async (req,res,next) => {
    try{
        const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            message:"cookie not found !!"
        })
    }
    
    //decode jwt
    
    const decoded=jwt.verify(token,process.env.my_secret);
    
    if(!decoded){
        return res.json({
            message:"unauthorized -invalid token !!"
        })
    }
    
    // console.log("decoded from protected:",decoded);
     
    const user= await User.findById(decoded.userId).select("-password");
    // console.log("user from protected:",user);

    
    if(!user){
        return res.status(401).json({
            message:"user- not exists !!"
        })
        
    }
    
    req.user=user;
    next();
}

catch(err){
    console.log("error in protectRoute middleware:",err);
    return res.status(500).json({
        message:"error in protect route :",
    })
    }    
}

export {protectRoute};