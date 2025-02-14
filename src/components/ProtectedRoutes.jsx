import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"



const ProtectedRoutes = () => {
    const {isLoggedIn} = useSelector((state) => state.auth)
    

    return isLoggedIn ? <Outlet />  : <Navigate to="/login" replace />;

}

export default ProtectedRoutes;