import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import NavigationBar from "./NavigationBar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth)
  return (
    <div>
        {isLoggedIn && <NavigationBar />}
        <ToastContainer limit={1} />
        <Outlet />
    </div>
  )
}

export default RootLayout