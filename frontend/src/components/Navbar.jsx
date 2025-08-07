import { Link, useLocation, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, ShipWheelIcon, Squirrel, User } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { RingLoader } from "react-spinners";
import { useState } from "react";



const Navbar = () => {
  const { authUser,isLoading } = useAuthUser();
  const navigate=useNavigate();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();


  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <Squirrel className="size-9 " />
                <span 
                style={{fontFamily:"cursive"}}
                className="text-3xl font-bold font-mono bg-clip-text text-green-400  tracking-wider">
                  Kukii
                </span>
              </Link>
            </div>
          )}

          <div className="flex items-center gap-[10vw] sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full ml-2">
              {isLoading ?(
                <User />
              ):  (
                <img
                  onClick={() => navigate("/profile")}
                  src={authUser?.user?.profilePic}
                  alt="User Avatar"
                  className="cursor-pointer"
                  
                />
              ) }
              
              
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle ml-3" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
