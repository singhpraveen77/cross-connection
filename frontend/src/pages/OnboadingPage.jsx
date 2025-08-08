import { useMutation, useQueryClient } from '@tanstack/react-query'

import toast, { Toaster } from 'react-hot-toast';
import { completeOnboardingMutation } from '../lib/api';
import useAuthUser from '../hooks/useAuthUser';
import { LANGUAGES } from '../constants';
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { useState } from 'react';
import {RingLoader, RiseLoader} from "react-spinners"
import { useNavigate } from 'react-router';

const OnboadingPage = () => {
  
  
    const queryClient=useQueryClient();
    const authUser=useAuthUser();

    const [imgloading,setImageLoading]=useState(true);

    const [imgError,setImageError]=useState(false);


    const [formState,setFormState]=useState({
        fullName:authUser?.fullName||'',
        bio:authUser?.bio || "",
        nativeLanguage:authUser?.nativeLanguage|| "",
        learningLanguage:authUser?.learningLanguage || "",
        location:authUser?.location || "",
        profilePic:authUser?.profilePic || "",
    })

    const {mutate,isPending}= useMutation({
        mutationFn:completeOnboardingMutation,
        onSuccess:()=>{
            toast.success("onboarded successfully !!")
            queryClient.invalidateQueries({queryKey:["authUser"]})
        }
    })



  const handleRandomAvatar = () => {
    setImageLoading(true);
    setImageError(false);

  const idx = Math.floor(Math.random() * 100) + 1;
  const randomAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${idx}`;

  const img = new Image();
  img.src = randomAvatar;

  img.onload = () => {
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
    setImageLoading(false);
  };

  img.onerror = () => {
    // First fallback: dicebear
    const dicebear = `https://avatar.iran.liara.run/public/${idx}.png`;
    const dicebearImg = new Image();
    dicebearImg.src = dicebear;

    dicebearImg.onload = () => {
      setFormState({ ...formState, profilePic: dicebear });
      toast.info("Using backup Dicebear avatar.");
      setImageLoading(false);
    };

    dicebearImg.onerror = () => {
      // Final fallback: local image in public folder
      const fallbackLocal = "/adventurer-1754655964787.png"; // use absolute path
      const localImg = new Image();
      localImg.src = fallbackLocal;

      localImg.onload = () => {
        setFormState({ ...formState, profilePic: fallbackLocal });
        toast.info("Using local fallback avatar.");
        setImageLoading(false);
      };

      localImg.onerror = () => {
        toast.error("All avatar sources failed.");
        setImageError(true);
        setImageLoading(false);
      };
    };
  };
};


    async function handleSubmit(e){
        e.preventDefault();
        mutate(formState);

    }

    return (

    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden relative flex items-center justify-center">
                {formState.profilePic ? (

                    imgloading ?(
                        <RiseLoader
                            color="#ffffff"
                            margin={1}
                            size={9}
                            speedMultiplier={1}
                            className='top-5 left-5'
                            />
                           
                    ):(
                        imgError ? (
                            <img src="/adventurer-1754655964787.png" alt="Fallback Avatar" />
                          ) : (
                            <img
                              src={formState.profilePic}
                              alt="Profile Preview"
                              className="w-full h-full object-cover"
                              onLoad={() => setImageLoading(false)}
                              onError={() => {
                                toast.error("Failed to load profile image.");
                                setImageError(true);
                                setImageLoading(false);
                              }}
                            />
                          )
                    )
                  
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}

            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      
      <Toaster position='top-center'/>
    </div>
  )
}

export default OnboadingPage