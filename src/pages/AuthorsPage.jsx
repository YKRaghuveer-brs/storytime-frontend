import { useEffect, useState } from "react";
import AuthorsList from "../components/authors/AuthorsList"
import { useGetPopularShowsQuery } from "../store/spotify/spotifyApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Formik, Form, Field } from 'formik';
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { logout } from "../store/user/authSlice";
import { toast } from "react-toastify";




const AuthorsPage = () => {

  

  const [authorsList, setAuthorsList] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const {userData} = useSelector((state) => state.auth)
  const {data: languagesData, isLoading: languageLoading} = useGetLanguagesQuery();

  const {data, isLoading, refetch: refetchUserInfo} = useGetUserProfileAPIQuery();
  const [search, setSearch] = useState(localStorage.getItem('ss') || 'popular stories top stories Comedy and Light-Hearted Tales kids stories motivation stories  Language:');

  const dispatch = useDispatch();

  useEffect(() => {
    refetchUserInfo();
  }, [refetchUserInfo])
  useEffect(() => {
    if (!isLoading) {
        if(data){
          if(data.profileData.isSuspended){
          dispatch(logout())
          toast.error("Your Account has been Suspended!")
          location.reload();
        }
        }   
    }
    
}, [isLoading, data, dispatch]);

  useEffect(() => {
    if(languagesData && !languageLoading){
      const selectedLanguagesNames = languagesData.filter((languagesData) => userData.languages.includes(languagesData._id)).map((item) => item.name).join(" ");
      setSelectedLanguages(selectedLanguagesNames)
     
    }
  }, [languagesData, languageLoading, userData.languages])


  const handleSearch = (values) => {
    if(values.searchText.trim())
    setSearch(values.searchText + " language: 'Telugu' 'English' 'Hindi' 'Tamil' ")
  else setSearch('"popular stories" "top stories" "Comedy and Light-Hearted Tales" "kids stories" "motivation stories"  Language:' + selectedLanguages);
    
  };



    


  

  const {data: authorsInfo, isLoading: authorsLoading, refetch: refecthAuthors} = useGetPopularShowsQuery(
    {
      queryParams: {
        q: search + selectedLanguages,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: "50",
      },
    }
  );

  useEffect(() => {
    refecthAuthors();
    localStorage.setItem("ss", search)
  }, [refecthAuthors, search])

  
  useEffect(() => {
    try {
      if(!authorsLoading){
      setAuthorsList(authorsInfo.shows.items);
    }
    } catch (error) {
      console.log(error)
      setAuthorsList([]);
    }
    
  },[authorsLoading, authorsInfo])

  return (
    <div className="container mx-auto mt-5 px-5">
              

            <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: "1%",
                  height: '10vh',
                  color: "black"
                }}
              >
                <Formik
                  initialValues={{ searchText: '' }}
                  onSubmit={(values) => {
                    handleSearch(values);
                  }}
                >
                  {() => (
                    <Form
                    className="z-10"
                      style={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                      }}
                    >
                      <Field
                        name="searchText"
                        type="search"
                        placeholder="Search..."
                        style={{
                          padding: '10px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          color: 'white',
                          width: '300px',
                          outline: '2px solid gray',
                          fontSize: '16px',
                          backgroundColor: '#011000',
                        }}
                      />
                      <button
                        type="submit"
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#703fce',
                          color: 'white',
                          border: '1px solid white',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '16px',
                        }}
                      >
                        Search
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>


      {authorsLoading ? <LoadingSpinner /> : <div>
        {(authorsList.length === 0 && !authorsInfo) && <p className="text-xl text-orange-400 text-center mt-12 pt-12">Authors not found. please try again later.!</p>}
        <AuthorsList authors={authorsList} />
      </div>}
    </div>
  )
}

export default AuthorsPage