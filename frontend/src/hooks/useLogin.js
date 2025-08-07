import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginfun } from "../lib/api";
import toast from "react-hot-toast";



const useLogin = () => {
  
    const queryClient= useQueryClient();
    

    const {mutate,error ,isPending}=useMutation({
        mutationFn:loginfun,
        onSuccess:()=>{
            toast.success("logedin successfully !!"),
            queryClient.invalidateQueries({queryKey:["authUser"]});
        },
        onError:()=>{
            toast.error("Wrong Credentials !!")
        }
        
    })

    return {loginMutation:mutate,error,isPending};

}

export default useLogin