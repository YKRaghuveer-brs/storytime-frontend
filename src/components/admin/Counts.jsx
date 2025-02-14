import { useEffect, useState } from "react"
import { useGetAdminProfilesAPIQuery, useGetUserProfilesAPIQuery } from "../../store/admin/adminApiSlice"
import { useGetCategoriesQuery } from "../../store/category/categoryApiSlice"
import { useGetLanguagesQuery } from "../../store/language/languageApiSlice"

const Counts = () => {


    const [users, setUsers] = useState();
    const [admins, setAdmins] = useState();
    const [languages, setLanguages] = useState();
    const [categories, setCategories] = useState();

    const {data: userCount, isLoading: userCountLoading, refetch: userRefresh} = useGetUserProfilesAPIQuery();
    const {data: adminsCount, isLoading:adminsCountLoaidng, refetch: adminRefresh} = useGetAdminProfilesAPIQuery();
    const {data: Cateriess, isLoading: CateriessLoading, refetch: categoryRefresh } = useGetCategoriesQuery();
    const {data: Languagess, isLoading: langLoading, refetch: languageRefresh } = useGetLanguagesQuery();
    
    useEffect(() => {
        if(!userCountLoading){
            setUsers(userCount?.userProfiles.length)
        }
    }, [userCountLoading, userCount]);

    useEffect(() => {
        if(!adminsCountLoaidng){
            setAdmins(adminsCount?.userProfiles.length)
        }
    }, [adminsCountLoaidng, adminsCount]);

    useEffect(() => {
        if(!CateriessLoading){
            setCategories(Cateriess.length)
        }
    }, [CateriessLoading, Cateriess]);

    useEffect(() => {
        if(!langLoading){
            setLanguages(Languagess.length)
        }
    }, [langLoading, Languagess]);

    useEffect(() => {
        userRefresh();
    }, [userRefresh])

    useEffect(() => {
        adminRefresh();
    }, [adminRefresh])

    useEffect(() => {
        categoryRefresh();
    }, [categoryRefresh])

    useEffect(() => {
        languageRefresh();
    }, [languageRefresh])
    
    
    
    

  return (
    <div className="px-16 m-0">

        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-700">
                <td className="border border-gray-800 bg-purple-800 px-2 py-3 text-center"> <span className="text-4xl">{users}</span>
                {userCountLoading && 
                <div className="grid place-items-center m-0">
                    <img className="w-10 h-10" src='./images/Spiral_logo_loader.gif' alt="" />
                </div>}
                 <br /> <span className="text-gray-400">{users > 1 ? " Users" : "User"}</span> </td>
                 
                <td className="border border-gray-800 bg-purple-800 px-2 py-3 text-center"> <span className="text-4xl">{admins}</span>
                {userCountLoading && 
                <div className="grid place-items-center m-0">
                    <img className="w-10 h-10" src='./images/Spiral_logo_loader.gif' alt="" />
                </div>}
                 <br /> <span className="text-gray-400">{admins > 1 ? " Admins" : "Admin"}</span> </td>

                <td className="border border-gray-800 bg-purple-800 px-2 py-3 text-center"> <span className="text-4xl">{categories}</span>
                {userCountLoading && 
                <div className="grid place-items-center m-0">
                    <img className="w-10 h-10" src='./images/Spiral_logo_loader.gif' alt="" />
                </div>}
                 <br /> <span className="text-gray-400">{categories > 1 ? " Categories" : "Categorie"}</span> </td>

                <td className="border border-gray-800 bg-purple-800 px-2 py-3 text-center"> <span className="text-4xl">{languages}</span> 
                {userCountLoading && 
                <div className="grid place-items-center m-0">
                    <img className="w-10 h-10" src='./images/Spiral_logo_loader.gif' alt="" />
                </div>}
                <br /> <span className="text-gray-400">{languages > 1 ? " Languages" : "Language"}</span> </td>            
                
            </tr>
            </thead>
            
        </table>

    </div>
  )
}

export default Counts