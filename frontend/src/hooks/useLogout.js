import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutfun } from "../lib/api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate=useNavigate();

  const {
    mutate: logoutMutation,
    isPending,
    error
  } = useMutation({
    mutationFn: logoutfun,

      onSuccess:(data)=>{
        console.log("from logout mutation: before",data)
        console.log("from logout mutation: just before",data)
        toast.success("logout successfully !!")
        console.log("from logout mutation: after ",data)
          navigate("/login");

          // queryClient.invalidateQueries({queryKey:["authUser"]});
        },
      onError:()=>{
          toast.error("something went wrong.. try again !!")
      }
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
