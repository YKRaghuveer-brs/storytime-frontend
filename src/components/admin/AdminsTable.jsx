import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminTableWithSearch from "./admin_helpers/AdminsTableWithSearch";
import { useGetAdminProfilesAPIQuery } from "../../store/admin/adminApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import Counts from "./Counts";


const AdminsTable = () => {
  const [demoData, setAdminProfiles] = useState([]);

  const {data: AdminProfiles, isLoading, refetch} = useGetAdminProfilesAPIQuery();

  useEffect(() => {
    if (!isLoading) { 
      // console.log(AdminProfiles.userProfiles)        
      setAdminProfiles(JSON.parse(JSON.stringify(AdminProfiles.userProfiles))); 
    }
  }, [isLoading, AdminProfiles]);

  useEffect(() => {
    refetch();
  }, [refetch])

  const handleUpdate = (updatedData) => {
    setAdminProfiles(updatedData);
    setTimeout(refetch, 2000)
  };

  const handleDelete = (updatedData) => {
    setAdminProfiles(updatedData);
    setTimeout(refetch, 2000)
  };

  return(
    <>
   {isLoading && <LoadingSpinner />}
    <AdminNavbar />
    <Counts />
    <div className="text-center">
      <button onClick={() => {refetch()}} className="border bg-gray-500 rounded px-1 py-1 relative top-10 hover:bg-gray-800">Refresh</button>
    </div>
    <AdminTableWithSearch data={demoData} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
    );
};

export default AdminsTable;
