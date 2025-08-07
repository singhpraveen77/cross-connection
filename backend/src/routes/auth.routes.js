import express from "express"
const router =express.Router();


//controllers importedd !!
import { login,logout,onboard,signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";



router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/onboarding",protectRoute,onboard);

//check if the user is authenticated or not  !!
router.get("/me",protectRoute,(req,res)=>{
    return res.status(200).json({
        message:"loggedin user is authenticated !!",
        user:req.user
    })
})


export default router;