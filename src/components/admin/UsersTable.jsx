import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import UserTableWithSearch from "./admin_helpers/UserTableWithSearch";
import { useGetUserProfilesAPIQuery } from "../../store/admin/adminApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import Counts from "./Counts";



const UsersTable = () => {
    const [demoData, setUserData] = useState([]);
    
    const {data: userProfiles, isLoading, refetch} = useGetUserProfilesAPIQuery();
    
      useEffect(() => {
        if (!isLoading) {         
          setUserData(JSON.parse(JSON.stringify(userProfiles.userProfiles))); 
        }
      }, [isLoading, userProfiles]);

      useEffect(() => {
        refetch();
      }, [refetch])

      const handleUpdate = (updatedData) => {
        setUserData(updatedData);
        setTimeout(refetch, 2000)
      };
    
      const handleDelete = (updatedData) => {
        setUserData(updatedData);
        setTimeout(refetch, 2000)
      };
    
      return(
        <>
        {isLoading && <LoadingSpinner />}
        <Counts />
        <AdminNavbar />
        <div className="text-center">
          <button onClick={() => {refetch()}} className="border bg-gray-500 rounded px-1 py-1 relative top-10 hover:bg-gray-800">Refresh</button>
        </div>
        
        <UserTableWithSearch data={demoData} onUpdate={handleUpdate} onDelete={handleDelete} />
        
        </>
        );
    };

export default UsersTable;
