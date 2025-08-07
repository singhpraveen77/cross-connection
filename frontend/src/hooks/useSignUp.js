import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signup } from '../lib/api';

const useSignUp = () => {
    const queryClient=useQueryClient();

    
    const { isPending, error, mutate } = useMutation({
    mutationFn:signup,
    onSuccess:()=>{
       
        queryClient.invalidateQueries({queryKey:["authUser"]})
    },
    onError:()=>{
    }
    },
    
    );
    return { isPending, error, SignupMutation:mutate }

}

export default useSignUp