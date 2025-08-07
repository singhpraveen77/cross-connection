import axiosInstance from "./axios";

const signup= async (signupdata)=>{
    const response=await axiosInstance.post("/auth/signup",signupdata);
    return response.data;
}

const getAuthUser= async ()=>{
      try {
        const res=await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
       
        return null;
      }
    }

const loginfun= async ({email,password})=>{
   try {
    const res= await axiosInstance.post("/auth/login",{email,password})
    return res.data;
    
   } catch (error) {
    throw error;
   }
}

const logoutfun= async ()=>{
    try {
        const res= await axiosInstance.post("/auth/logout") 
        return res.data;
    } catch (error) {
        
    }
}

const completeOnboardingMutation= async(userdata)=>{
    const res= await axiosInstance.post("/auth/onboarding",userdata)
    return res.data;
}

const getUserFriends=async() =>{
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

const getRecommendedUsers=async()=> {
  const response = await axiosInstance.get("/users");
  return response.data;
}

const  getOutgoingFriendReqs=async()=> {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

const  getFriendRequests=async()=> {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}


const sendFriendRequest=async(userId)=> {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

const acceptFriendRequest=async(userId)=> {
  const response = await axiosInstance.put(`/users/friend-request/${userId}/accept`);
  return response.data;
}

const getStreamToken=async()=> {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
}

export {
    signup,
    getAuthUser,
    loginfun,
    completeOnboardingMutation,
    logoutfun,
    getUserFriends,
    getRecommendedUsers,
    getOutgoingFriendReqs,
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    getStreamToken,
};