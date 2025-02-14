import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import { logout } from "../store/user/authSlice";



const ErrorPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
   
  const Logout = () => {
    toast.error("Please wait, Sorry for the inconvenience. Please log in again to continue.")
    
    setTimeout(() => {
      dispatch(logout())
      navigate("/", { replace: true });
    }, 3000);
    
  }

  return (
    <>
     <ToastContainer />
      
      <div>
      <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn&apos;t find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>

             <p  className="mt-4 mb-8 text-blue-300">
            Still experiencing issues? <button onClick={Logout} className="text-orange-400 hover:underline">Click here to force quit and try again!</button> 
            </p>

            <Link
            
              className="px-8 py-3 font-semibold rounded border-2 dark:bg-violet-400 dark:text-gray-900"
              to="/home"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
    
  )
}

export default ErrorPage