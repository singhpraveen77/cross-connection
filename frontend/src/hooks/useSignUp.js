import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';
import { toast } from 'react-hot-toast'; // if you're using toast

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Signup successful!');
    },
    onError: (error) => {
        console.log("error in useSign:",error);
      toast.error("somthing went wrong !!"); // Show the error message from backend
    }
  });

  return { isPending, error, SignupMutation: mutate };
};

export default useSignUp;
