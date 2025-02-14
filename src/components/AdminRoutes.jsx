import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"



const AdminRoutes = () => {
    const {isLoggedIn, isAdmin} = useSelector((state) => state.auth)
    

    return isLoggedIn ? (isAdmin ? <Outlet /> : <Navigate to="/home" replace />) : <Navigate to="/login" replace />;

}

export default AdminRoutes;