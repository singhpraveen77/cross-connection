import { Toaster } from 'react-hot-toast';
import {createBrowserRouter, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';

import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import AppLayout from './layout/AppLayout';
import { RouterProvider } from 'react-router-dom';


import PageLoader from './components/PageLoader';

import useAuthUser from './hooks/useAuthUser';
import OnboadingPage from './pages/OnboadingPage';
import HomeLayout from './layout/HomeLayout';
import { useThemeStore } from './store/useThemeStore';
import Notifications from './pages/Notifications';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  const {authUser,isLoading}=useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded= authUser?.user?.isOnboarded;

  const {theme}=useThemeStore();
 

  if(isLoading) return <PageLoader/>;


  const router=createBrowserRouter([{
    path:"/",
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element: isAuthenticated && isOnboarded ? (
        <HomeLayout showSideBar={true}>
          <HomePage/>
        </HomeLayout>):(
          !isOnboarded ? <Navigate to ="/onboading"/> :<Navigate to ="/"/>
        ),
      },

      {
        path:"/login",
        element:!isAuthenticated ?<LoginPage/>:<Navigate to ="/"/>,
      },

      {
        path:"/signup",
        element:!isAuthenticated ?<SignUpPage/>:<Navigate to ={isOnboarded ? ("/"):("/onboading") }/>,
      },

      
      {
        path:"/profile",
        element:isAuthenticated && isOnboarded ?
        (<HomeLayout showSidebar={true}>
          <ProfilePage/>
        </HomeLayout>
        ):(
          isAuthenticated ? (<Navigate to="/onboarding"/>):(<Navigate to="/login"/>)
        )
      },

      {
        path:"/onboading",
        element:isAuthenticated ? (
          isOnboarded ? (<Navigate to ="/"/>):(<OnboadingPage/>)
        ):(<Navigate to ="/login"/>),
      },
      {
        path:"/notifications",
        element:isAuthenticated && isOnboarded ?
        (<HomeLayout showSidebar={false}>
          <Notifications/>
        </HomeLayout>
        ):(
          isAuthenticated ? (<Navigate to="/onboarding"/>):(<Navigate to="/login"/>)
        )
      }
      ,
      {
        path:"/chat/:id",
        element:isAuthenticated && isOnboarded ?
        (<HomeLayout showSidebar={false}>
                <ChatPage />
              </HomeLayout>):(
          isAuthenticated ? (<Navigate to="/onboarding"/>):(<Navigate to="/login"/>)
        )
      },
      {
        path:"/call/:id",
        element:isAuthenticated && isOnboarded ?
            (
                <CallPage />
             ):(
          isAuthenticated ? (<Navigate to="/onboarding"/>):(<Navigate to="/login"/>)
        )
      },
      {
        path:"/*",
        element:<ErrorPage/>
      }

    ]
  }])


  return (
    <div className='h-screen' data-theme={(theme)} >
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router}/>
    </div>

  )
}

export default App
