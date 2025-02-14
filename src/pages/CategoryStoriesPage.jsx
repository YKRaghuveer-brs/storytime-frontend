
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"
import { useGetPopularShowsQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Formik, Form, Field } from 'formik';
import CategoryStoriesHelp from "../components/home/CategoryStoriesHelp";


const CategoryStoriesPage = () => {
    

    const location = useLocation();
    const { categoryName, selectedLanguages } = location.state;
    const [stories, setStories] = useState([]);
    const [search, setSearch] = useState(categoryName+" language:"+selectedLanguages);
    const {data: categoryStories, isLoading: categoryStoriesLoading} = useGetPopularShowsQuery(
        {
          queryParams: {
            q: `${search}`,
            type: "show",
            include_external: "audio",
            market: "IN",
            limit: "50",
          },
        }
      );
      
    
      useEffect(() => { // Popular Stories
        try {
          if(!categoryStoriesLoading){
            setStories(categoryStories.shows.items); 
          }
        } catch (error) {
          console.log(error)
          setStories([]); 
        }
        
      },[categoryStoriesLoading, categoryStories])


      const handleSearch = (values) => {
        if(values.searchText.trim())
        setSearch(values.searchText + " language:Telugu English Hindi Tamil ")
      else setSearch(categoryName+" language:"+selectedLanguages);
      };


  return (
    <div>
        <nav className="text-black font-bold pt-10 px-6" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex text-white">
          <li className="inline-flex p-0 m-0 items-center text-white">
            <Link to="/home" className="z-10 hover:text-blue-500 text-white">
              <svg
                className="w-6 h-auto fill-current mr-0 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
              </svg>
            </Link>
          </li>
          <li className="p-0 m-0 flex items-center text-white">
            <svg
              className="fill-current w-3 h-3 mx-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>

          <li className="flex items-center text-white">
            <Link to="/categories" className="z-10 text-white mr-0" aria-current="page">
              Categories
            </Link>
            <svg
              className="fill-current w-3 h-3 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          </li>
          <li className="text-gray-300">{categoryName+" language:"+selectedLanguages === search ? categoryName : "Search Results"}</li>
        </ol>
      </nav>
        <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "-4%",
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


    {categoryStoriesLoading && <LoadingSpinner />}
    {!categoryStoriesLoading && <CategoryStoriesHelp stories={stories} />}
    <div className="text-center mt-12 p-12">
    {(!categoryStoriesLoading && !categoryStories ) &&   <p className="text-xl text-orange-400 ">Unable to load Stories. Please try again later!</p>}
    </div>
    
    
    
    </div>

    
  )
}

export default CategoryStoriesPage