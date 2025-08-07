
import mongoose from "mongoose"

const database=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URL,
            
        )
        .then(()=>{
        })
    }
    catch(err){
    }
}

export default database;