
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { useGetCategoriesQuery } from "../store/category/categoryApiSlice";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import { useGetUserProfileAPIQuery, useUpdateLanguageAPIMutation } from "../store/user/userApiSlice";
import { useEffect, useState } from "react";
import { logout, setUserProfile, toggleLanguageSelection } from "../store/user/authSlice";
import { toast } from "react-toastify/unstyled";
import { useNavigate } from "react-router-dom";



  const CategoriesPage = () => {
  const {data, isLoading: uDataLoad, refetch: refetchUserInfo} = useGetUserProfileAPIQuery();
  const {data: categoriesData, isLoading, error} = useGetCategoriesQuery();
  const {data: languagesData, isLoading: isLanguagesLoading, error: languagesError} = useGetLanguagesQuery();
  const [ updateLanguageAPI ] = useUpdateLanguageAPIMutation();
  const { userData } = useSelector((state) => state.auth);
  const [selectedLanguages, setSelectedLanguages] = useState(null);
  
  
  
  let i = 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
        if (!isLoading) {
            dispatch(setUserProfile({ ...data }));
            if(userData){
              if(userData.isSuspended){
              dispatch(logout())
              toast.error("Your Account has been Suspended!")
              location.reload();
            }
            }       
            
        }
        
    }, [isLoading, data, dispatch]);
    
    useEffect(() => {
        if (!uDataLoad) {
            dispatch(setUserProfile({ ...data }));
        }
    }, [uDataLoad, data, dispatch]);



  const isLanguageSelected = (languageId) => {
    return userData.languages.includes(languageId);
  }

  useEffect(() => {
    const updateLanguages = async () => {
      try {
        updateLanguageAPI({
          languageIds: userData.languages,
        }).unwrap();
        
      } catch (error) {
        toast(error?.data?.message || error)
      }
    }
    updateLanguages();
    
  }, [userData.languages, updateLanguageAPI ])

  const handleLanguageClick = async (languageId) => {
    dispatch(toggleLanguageSelection(languageId));
  };
  
  


  const categoryHandler = (categoryName) => {
    navigate("/stories", {state: { categoryName, selectedLanguages }})
  }
  useEffect(() => {
    if(languagesData){
      const selectedLanguagesNames = languagesData.filter((languagesData) => userData.languages.includes(languagesData._id)).map((item) => item.name).join(" ");
      setSelectedLanguages(selectedLanguagesNames)
     
    }
  }, [languagesData, userData.languages])
  

  useEffect(() => {
    refetchUserInfo();
  }, [refetchUserInfo])

  
  return (
    <div>
      


      <div style={{ backgroundColor: "#443280" }}>
        <div className="container mx-auto px-6">
          <section>
            <div className="py-6 rounded-xl mt-5">
              <header className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                  languages
                </h3>
              </header>

              <div className="flex mb-10">
              
                {isLanguagesLoading ? (
                  <LoadingSpinner />
                ) : languagesError ? (
                  <p>Unable to load languages. Please try again later</p>
                ) : (
                  languagesData &&
                  languagesData.map((language) => (
                    <div className="z-10" key={language._id}>
                      <button
                        className={`flex  ${
                          isLanguageSelected(language._id)
                            ? "bg-white text-black"
                            : 
                            "text-white"
                        }  px-3 py-1 rounded-full mr-3`}
                        onClick={() => handleLanguageClick(language._id)}
                      >
                        {language.name}
                        {isLanguageSelected(language._id) ? (
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 ml-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                         </svg>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div> 

              <header className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold tracking-tight text-white hover:underline">
                  Catergories
                </h3>
              </header>

            

              <div className="grid grid-cols-4 gap-x-4 gap-y-4">
                {isLoading ? (
                 <LoadingSpinner />
                ) : 
                error ?  (
                  <p>Unable to load categories. Please try again later.</p>
                ) : 
                (
                  categoriesData.map((category) => (
                      <div
                        key={category._id}
                        className={`p-6 rounded-xl z-10 hover:bg-active group active h-64 text-3xl flex items-end siraledge category-${
                         i<9 ? i : i = 1, i++
                        }`}
                        onClick={() => categoryHandler(category.category)}
                      >
                        <button className="text-left">{category.category}</button>
                      </div>
                    ))
                )
                                 
              }
                 
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage