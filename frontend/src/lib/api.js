import axiosInstance from "./axios";


const signup = async (signupData) => {
  try {
    const res = await axiosInstance.post("/auth/signup", signupData);
    return res.data;
  } catch (error) {
    console.log("error in sin api:",error);
    throw error?.response?.data || { message: "Signup failed" };
  }
};

const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("error in get auth api :",error);
    return null; // User not logged in
  }
};


const loginfun = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    console.log("error in login api :",error);
    // This will ensure React Query's onError triggers properly
    throw error?.response?.data || { message: "Login failed" };
  }
};


const logoutfun = async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    console.log("error in logout api  :",error);
    throw error?.response?.data || { message: "Logout failed" };
  }
};

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