import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutfun } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error
  } = useMutation({
    mutationFn: logoutfun,
      onSuccess:()=>{
          toast.success("logout successfully !!")
          queryClient.invalidateQueries({queryKey:["authUser"]})
        },
      onError:()=>{
          toast.error("something went wrong.. try again !!")
      }
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
