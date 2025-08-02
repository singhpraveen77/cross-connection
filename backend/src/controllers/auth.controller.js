import User from "../models/User.js";
import jwt from "jsonwebtoken"
import { upsertStreamUser } from "../db/stream.js";


const signup=async (req,res)=>{
    console.log("reached signup !!")

    try{
    const {email,password,fullName}=req.body;

    if(!email || !password || !fullName){
        return res.status(400).json({
            success:false,
            message:"fill the required details !!",

        })
    }
    
    if(password.length<6){
        return res.status(400).json({
            success:false,
            message:"pass is shorter than 6 !!",
    
        })
        
    }
    
    const check_mail=await User.findOne({email});
    
    if(check_mail){
        return res.status(400).json({
            success:false,
            message:"User already existed !!",
    
        })
        
    }

    //validate email:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    //profile
    const  idx=Math.floor(Math.random()*100)+1;

    const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`


    //create 

    const newUser= await User.create({
        fullName,
        email,
        password,
        profilePic:randomAvatar,
    })

    //new User.create -> newUser.save() or await


    //create a stream account for the video call feature !!

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }


    const token=jwt.sign({userId:newUser._id},process.env.my_secret,{
        expiresIn:"7d"
    })

    // res.cookie("jwt",token,{
    //     maxAge:7*24*60*60*1000,
    //     httpOnly:true , //xss attacks
    //     sameSite:"strict", //CSRF attacks
    //     secure:process.env.NODE_ENV === "production"
    // })
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true , //xss attacks
        sameSite:"lax", // to allow cors 
        secure:process.env.NODE_ENV === "production"//production = true else false
    })

    res.status(201).json({
        success:true,
        user:newUser,
        message:"user created successfully !!"
    })
}
    catch(err){
        console.log("error in signup controller :",err);
        return res.status(500).json({
            message:err
        })
    }

}


const login= async(req,res)=>{

    try{
    const {email,password}=req.body;

    if(!email || !password ){
        return res.status(400).json({
            success:false,
            message:"fill the required details !!",

        })
    }
       
    const user=await User.findOne({email});
    
    if(!user){
        return res.status(400).json({
            success:false,
            message:"email or password incorrect !!",
    
        })       
    }
    
    const isPassCorrect=await user.matchPassword(password);
    if(!isPassCorrect){
        return res.status(401).json({
            success:false,
            message:"email or password incorrect !!",
    
        })
        
    }

    const token=jwt.sign({userId:user._id},process.env.my_secret,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true , //xss attacks
            sameSite:"lax", // to allow cors 
            secure:process.env.NODE_ENV === "production"//production = true else false
        })

    return res.status(201).json({
        success:true,
        user:user,
        message:"login successfully !!"
    })
}
    catch(err){
        console.log("error in login controller :",err)
        return res.status(500).json({
            message:err
        })
    }

    
}


const logout= (req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({
        success:true,
        message:"logout successfull !!"
    })
}


const onboard=async (req,res)=>{
    try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }//returns updated user !!
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    console.log("onboardedbackend !!")
    res.status(200).json({ success: true, user: updatedUser });


  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export {login,signup,logout,onboard};

