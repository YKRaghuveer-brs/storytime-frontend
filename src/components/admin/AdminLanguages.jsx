import { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import LanguagesTableWithSearch from "./admin_helpers/LanguagesTableWithSearch";
import { useGetLanguagesQuery } from "../../store/language/languageApiSlice";
import LoadingSpinner from "../LoadingSpinner";
import Counts from "./Counts";
// import NavigationBar from "../components/NavigationBar";





const AdminLanguages = () => {
  const [languagess, setLanguages] = useState([]);

    const {data: languages, isLoading, refetch} = useGetLanguagesQuery();
    
      useEffect(() => {
        if (!isLoading) {   
          // console.log(languages)      
          setLanguages(JSON.parse(JSON.stringify(languages))); 
        }
      }, [isLoading, languages]);

      useEffect(() => {
        refetch();
      }, [refetch])

  const handleUpdate = (updatedData) => {
    setLanguages(updatedData);
    setTimeout(refetch, 2000)
  };

  const handleDelete = (updatedData) => {
    setLanguages(updatedData);
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
    <LanguagesTableWithSearch data={languagess} onUpdate={handleUpdate} onDelete={handleDelete} />
    </>
    );
};

export default AdminLanguages;
