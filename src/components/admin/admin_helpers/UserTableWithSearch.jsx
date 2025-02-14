import { useState } from "react";
import { useDeleteProfilesAPIMutation, useUpdateUserProfilesAPIMutation } from "../../../store/admin/adminApiSlice";
import { toast, ToastContainer } from "react-toastify";
import NewUserForm from "../NewUserForm";
import LoadingSpinner from "../../LoadingSpinner";



const UserTableWithSearch = ({ data, onUpdate, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on the search query
  const filteredData = data.filter(
    (item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Column keys to display
  const columns = [
      { key: "first_name", label: "First Name" },
      { key: "last_name", label: "Last Name" },
      { key: "email", label: "Email" },
      { key: "languages", label: "Languages", render: (value) => value.length }, // Read-only
      { key: "saved_stories", label: "Saved Stories", render: (value) => value.length }, // Read-only
      { key: "verified", label: "Verified", render: (value) => (value ? "Yes" : "No") }, // Select
      { key: "isSuspended", label: "Suspended", render: (value) => (value ? "Yes" : "No") }, // Select
      { key: "isAdmin", label: "Admin", render: (value) => (value ? "Yes" : "No") }, // Select
    ];

  const handleChange = (e, rowIndex, columnKey) => {
    const updatedData = [...data];
    if (columnKey === "verified" || columnKey === "isSuspended" || columnKey === "isAdmin") {
      updatedData[rowIndex][columnKey] = e.target.value === "true"; // Convert to boolean
    } else {
      updatedData[rowIndex][columnKey] = e.target.value; // Update text fields
    }
    onUpdate(updatedData);
  };


  const [updateUserProfilesAPI, {isLoading}] = useUpdateUserProfilesAPIMutation();
  const [deleteUserProfileAPI, {isLoading: deleteLoading}] = useDeleteProfilesAPIMutation();

  const handleSubmit = async (rowIndex) => {
    toast.dismiss();
    const row = paginatedData[rowIndex];
    const updatedInfo= {
      first_name: row.first_name, 
      last_name: row.last_name, 
      email: row.email, 
      isAdmin: row.isAdmin, 
      verified: row.verified, 
      isSuspended: row.isSuspended, 
      id: row.id,
    }
    try {
      const response = await updateUserProfilesAPI(updatedInfo)
      toast.success(response?.data?.message)

      toast.error(response?.error?.data?.message)
    } catch (error) {
      toast.error(error)
     
    }
  
  };

  const handleDelete = async (rowIndex) => {
    toast.dismiss();
    const row = paginatedData[rowIndex];
  
    
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this user?\n\nName: ${row.first_name}\nEmail: ${row.email}`
    );
  
    if (!isConfirmed) {
      toast.success('User restoration successful – deletion undone.')
      return; 
    }
  
    try {
      const response = await deleteUserProfileAPI({ id: row.id });
  
      if (response?.data?.message) {
        toast.success(response.data.message);
        
        // Update UI after deletion
        const updatedData = data.filter((_, index) => index !== rowIndex);
        onDelete(updatedData);
      } else {
        toast.error(response?.error?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  

  const [showPopup, setShowPopup] = useState(false);

  const handleNewUser = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    
    <div className="p-4">
      <ToastContainer />

      {(isLoading || deleteLoading) && <LoadingSpinner />}

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full"
            >
              X
            </button>
            <NewUserForm />
          </div>
        </div>
      )}
      
      <h1 className="text-xl font-bold mb-4">Search Users</h1>

      <input
        type="Search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        className="border bg-black rounded px-4 py-2 mb-1 w-100"
      />
      <div className="text-end px-6">
        <button className="m-0 px-4 py-2 bg-green-600 text-white rounded" onClick={handleNewUser}>Add User</button>
      </div>

      <div className="mb-4">
        <label htmlFor="recordsPerPage" className="mr-2 text-white">Records per page:</label>
        <select
          id="recordsPerPage"
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1); // Reset to first page on records change
          }}
          className="border bg-green-500 rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-900">
            <th className="border border-gray-300 px-4 py-2 text-left">S.No</th>
            {columns.map((col) => (
              <th key={col.key} className="border border-gray-300 px-4 py-2 text-left">
                {col.label}
              </th>
            ))}
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-600"}>
              <td className="border border-gray-300 px-4 py-2">
                {(currentPage - 1) * recordsPerPage + rowIndex + 1}
              </td>
              {columns.map((col) => (
                <td key={col.key} className="border border-gray-300 ">
                  {col.key === "verified" || col.key === "isSuspended" || col.key === "isAdmin" ? (
                    <select
                      value={row[col.key]}
                      onChange={(e) => handleChange(e, rowIndex, col.key)}
                      className={rowIndex % 2 === 0 ? "border bg-gray-800 rounded px-2 py-3 w-full" : "border bg-gray-600 rounded px-2 py-3 w-full"}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : col.key === "languages" || col.key === "saved_stories" ? (
                    <input
                      type="text"
                      value={col.render(row[col.key])}
                      readOnly
                      className={rowIndex % 2 === 0 ? "border bg-gray-800 rounded px-2 py-3 w-ful7" : "border bg-gray-600 rounded px-2 py-3 w-full"}
                    />
                  ) : (
                    <input
                      type="text"
                      value={row[col.key]}
                      onChange={(e) => handleChange(e, rowIndex, col.key)}
                      className={rowIndex % 2 === 0 ? "border bg-gray-800 rounded px-2 py-3 w-ful7" : "border bg-gray-600 rounded px-2 py-3 w-full"}
                    />
                  )}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleSubmit(rowIndex)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(rowIndex)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center text-xl mt-6 text-red-400">{paginatedData.length === 0 && "No Results"}</div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-medium">Total Records: {filteredData.length}</span>
        <div className="flex space-x-2">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === page + 1 ? "bg-blue-800 text-white" : "bg-blue-200 text-black"
              }`}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTableWithSearch