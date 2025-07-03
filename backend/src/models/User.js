import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlenght:6

    },
    bio:{
        type:String,
        default:""
        
    },
    profilePic:{
        type:String,
        default:""
    },
    nativeLanguage:{
        type:String,
        default:"",
        
    },
    learningLanguage:{
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:""
       
    },
    isOnboarded:{
        type:Boolean,
        default:false,
    },
    friends:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    ]
},{timestamps:true})

//pre hook-> these are added before created a model !!
// userSchema.pre("save",async(next)=>{

//     if(!this.isModified("password"))return next();

//     try{
//         const salt=await bcrypt.genSalt(10);
//         this.password=bcrypt.hash(this.password,salt);
//         next();
//     }
//     catch(err){
//         console.log("pass hashing error :",err);
//         next(err);
//     }
// })
//this won't work with arrow funtions 
userSchema.pre("save",async function ( next){

    if(!this.isModified("password"))return next();

    try{
        const salt=await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password,salt);
        next();
    }
    catch(err){
        console.log("pass hashing error :",err);
        next(err);
    }
})

//remember this how to embbed the methods in the user
userSchema.methods.matchPassword=async function(entered_pass){
    const check = await bcrypt.compare(entered_pass,this.password);

    // const check =await bcrypt.compare(this.password,entered_pass); this is wrong

    return check;//boolean value 
}

const User=mongoose.model("User",userSchema);



export default User;