import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CategoriesPage from "./pages/CategoriesPage"
import AuthorsPage from "./pages/AuthorsPage"
import AuthorStoriesPage from "./pages/AuthorStoriesPage"
import LibraryPage from "./pages/LibraryPage"
import RootLayout from "./components/RootLayout"
import ProtectedRoutes from "./components/ProtectedRoutes"
import ProfilePage from "./pages/ProfilePage"
import ErrorPage from "./pages/ErrorPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import CategoryStoriesPage from "./pages/CategoryStoriesPage";
import Sidebar from "react-sidebar";
import SidebarPlayer from "./components/sidebar/sidebarPlayer";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSidebarMinimize, updateSpotifyToken } from "./store/user/authSlice";
import { useEffect, useState } from "react";
import { useGetRefreshTokenAPIQuery } from "./store/user/userApiSlice";
import CatchyMusicButton from "./components/sidebar/CatchyMusicButton";


import AdminRoutes from "./components/AdminRoutes";
import UsersTable from "./components/admin/UsersTable";
import AdminsTable from "./components/admin/AdminsTable";
import AdminCategories from "./components/admin/AdminCategories";
import AdminLanguages from "./components/admin/AdminLanguages";





const router = createBrowserRouter([
  {path: "/", element: <RootLayout />,
    
    errorElement: <ErrorPage />,

    children: [

    {index: true, element: <LoginPage />},
    {path: "/login", element: <LoginPage />},
    {path: "/register", element: <RegisterPage />},
    {path: "/forgotpassword", element: <ForgotPasswordPage />},
    {path: "/resetpassword/:token", element: <ResetPasswordPage />},
    {path: "/verifyemail/:verifytoken", element: <EmailVerifyPage />},
    
    

    {element: <ProtectedRoutes />, children: [
      { path: "/home", element: <HomePage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/stories", element: <CategoryStoriesPage /> },
      { path: "/authors", element: <AuthorsPage /> },
      { path: "/authorstories", element: <AuthorStoriesPage /> },
      { path: "/library", element: <LibraryPage /> },
      


    ]}

  ]},

  {element: <AdminRoutes />, children: [
    { path: "/users", element: <UsersTable /> },
    { path: "/admins", element: <AdminsTable /> },
    { path: "/admincategories", element: <AdminCategories /> },
    { path: "/adminlanguages", element: <AdminLanguages /> },
  ]},
])

export default function App() {
  const [shouldFetchToken, setShouldFetchToken] = useState(false);
  const { isSidebarOpen, isSidebarMinimized, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log("isSidebarMinimized " + isSidebarMinimized)
  // console.log("isSidebarOpen "+ isSidebarOpen)
  
  const maximize = () => {
   dispatch(toggleSidebarMinimize())
  }

  const { data: spotifyToken, refetch: refetchSpotifyToken } = useGetRefreshTokenAPIQuery();


  

  useEffect(() => {
    if(spotifyToken && shouldFetchToken){
      dispatch(updateSpotifyToken({ spotifyToken: spotifyToken.spotifyToken}))
    }
  }, [spotifyToken, shouldFetchToken, dispatch])


  useEffect(() => {
    if(!isLoggedIn){
      setShouldFetchToken(false);
      return;
    }

    setShouldFetchToken(true)
    const refreshInterval = 45 * 60 * 1000; // 10 * 1000; // 10 seconds 59* 60 * 1000; // 59 min
    const intervalId = setInterval(() => {
      console.log("Refreshing token...");
      console.log(spotifyToken);
      if(shouldFetchToken){
        refetchSpotifyToken();
      }
      
    }, refreshInterval);

    //CleanUp interval on component unmount
    return () => clearInterval(intervalId);
  }, [refetchSpotifyToken,spotifyToken, isLoggedIn, shouldFetchToken])


  return (
    <>
    <div className="mt-5"></div>
    {isSidebarOpen && 
    <div>
    <Sidebar 
      sidebar={<SidebarPlayer />}
      open={isSidebarMinimized} 
      onSetOpen={maximize} 
      pullRight={true}
      sidebarClassName={'shadow-none fixed z-40'}
    />
    {(!isSidebarMinimized && isSidebarOpen) && <CatchyMusicButton />}
    </div>
    }

    
    
    <RouterProvider router={router} />
    
    </>
    
  )
}