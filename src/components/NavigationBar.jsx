import {  Link, NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user/authSlice";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";

// import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";



const NavigationBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const {userData, isLoading, isAdmin} = useSelector((state) => state.auth);
  
  
  const Logout = () => {
   
    dispatch(logout())
    toast.success("Successfully logged out. Thank you for visiting!")
    navigate("/", { replace: true })
    
  }

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
  
    const handleToggle = () => {
      setIsActive(prevState => !prevState);
    };
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsActive(false); // Close dropdown if clicked outside
        }
      };
  
      document.addEventListener('click', handleClickOutside);
  
      // Cleanup event listener on component unmount
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
  
  // const user = false;
  return (
    <div>
      
      <nav className="bg-brandColor fixed w-full mt-0 top-0 z-30 px-5">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
             <Link>
                <img
                  className="lg:block h-8 w-auto mr-2"
                  src="./images/logo.svg"
                  alt="Workflow"
                />
              </Link>
              StoryTime
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 items-center leading-loose px-4">
                <NavLink to="/home" className={({isActive}) => (isActive
                  ? "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-300 after:origin-left after:transition-transform after:duration-300 after:scale-x-100 after:animate-slide"
                  : "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-400 after:origin-right after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100"
                  )}>Home</NavLink>
                <NavLink to="/categories" className={({isActive}) => (isActive
                  ? "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-300 after:origin-left after:transition-transform after:duration-300 after:scale-x-100 after:animate-slide"
                  : "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-400 after:origin-right after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100"
                  )}>Categories</NavLink>
                <NavLink to="/authors" className={({isActive}) => (isActive
                  ? "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-300 after:origin-left after:transition-transform after:duration-300 after:scale-x-100 after:animate-slide"
                  : "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-400 after:origin-right after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100"
                  )}>Authors</NavLink>
                <NavLink to="/library" className={({isActive}) => (isActive
                  ? "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-yellow-300 after:origin-left after:transition-transform after:duration-300 after:scale-x-100 after:animate-slide"
                  : "relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-400 after:origin-left after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100"
                  )}>Library</NavLink>
                  {/* <NavLink to="/users" className={isAdmin ? "text-green-500 relative px-3 py-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gray-400 after:origin-left after:transition-transform after:duration-200 after:scale-x-0 hover:after:scale-x-100" : "hidden"} >Admin Dashboard</NavLink> */}
              </div>
            </div>
            
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
         { userData && !isLoading &&  <p className="text-white pr-2">Welcome back, {userData.first_name}! { userData.isAdmin ? '🏆' : '😊'} </p>}
            <ul className="menu">
            <li
                className={`dropdown dropdown-6 relative ${isActive ? 'active' : ''}`}
                onClick={handleToggle}
                ref={dropdownRef} 
              >
                
                <button  className="flex items-center">
                 
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="#000000" 
                      width="50px" 
                      height="50px" 
                      viewBox="-2.4 -2.4 28.80 28.80">
                        <g id="SVGRepo_bgCarrier" transform="translate(6.12,6.12), scale(0.49)">
                          <rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#fafbff"></rect>
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                        </g>
                    </svg>

                </button>
                <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6">
                  <NavLink to="/profile"><li className="dropdown_item-2 rounded-t-xl">
                    Account
                  </li></NavLink>
                  <li className="dropdown_item-1 rounded-b-xl"  onClick={Logout}>
                    Logout
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    </div>
  )
}

export default NavigationBar;