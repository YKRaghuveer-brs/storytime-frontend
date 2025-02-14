import { Link, useLocation } from "react-router-dom"
import AuthorStoriesList from "../components/authors/AuthorStoriesList"
import { useGetPopularShowsQuery } from "../store/spotify/spotifyApiSlice";
import { useEffect, useState } from "react";



const AuthorStoriesPage = () => {

  const [featured, setFeatured] = useState([]);
  const location = useLocation();
  const {publisher, name, url} = location.state;
  

  const {data: featuredList, isLoading: featuredLoading} = useGetPopularShowsQuery({
    queryParams: {
      q: publisher +" "+ name ,
      type:"show",
      include_external: "audio",
      market: "IN",
      limit: "50"

    }
  })

  useEffect(() => {
    try {
      if(!featuredLoading){
        setFeatured(featuredList.shows.items.filter(
          (story) => story.publisher.includes(publisher)
        ))
      
        
      }
    } catch (error) {
      console.log(error)
      setFeatured([]);
    }
  }, [featuredLoading, publisher, featuredList])


  return (
    <>

    
      <div className="mx-16">
        <nav className="text-black font-bold pt-10" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex text-white">
            <li className="inline-flex items-center text-white">
              <Link to="/home" className="z-10 hover:text-blue-500 text-white">
                <svg
                  className="w-5 h-auto fill-current mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
                </svg>
              </Link>
            </li>
            <li className="flex items-center text-white">
              <svg
                className="fill-current w-3 h-3 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>

            <li className="flex items-center text-white">
              <Link to="/authors" className="z-10 text-white" aria-current="page">
                Authors
              </Link>
              <svg
                className="fill-current w-3 h-3 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="text-gray-300">{name}</li>
          </ol>
        </nav>

        <div>
          <div className="grid place-items-center">
            <div className="w-50 text-center">
              <div>
                <img
                  src={url}
                  className="w-48 h-48 inset-0 object-cover rounded-full mx-auto"
                />
              </div>
              <p className="text-3xl py-4">{name}</p>
              
              <p className="text-s">author: <b>{publisher}</b> </p>

              <div className="flex items-center justify-center mt-3 mx-auto">
                <button className="flex bg-black p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Follow
                </button>
              </div>
            </div>
          </div>
          <header className="flex items-center justify-between mb-4">
            <h3 className="text-2xl text-white font-semibold tracking-tight hover:underline">
              Featured Stories
            </h3>
          </header>

          { (featured.length > 0) ? (
            <AuthorStoriesList stories={featured} />
          ) : (
            <p className="text-center text-xl text-red-400 mt-12 pt-12">No Stories to load!</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AuthorStoriesPage