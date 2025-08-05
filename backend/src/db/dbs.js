
import mongoose from "mongoose"

const database=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URL,
            
        )
        .then(()=>{
            console.log("mongodb connected !! ")
        })
    }
    catch(err){
        console.log("error in the database  :",err);
    }
}

export default database;