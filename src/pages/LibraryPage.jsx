import { Link } from "react-router-dom"
import LibraryList from "../components/LibraryList"
import { useGetLibraryAPIQuery, useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { useEffect, useState } from "react";
import { useGetShowsByShowIdQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { logout } from "../store/user/authSlice";
import { toast } from "react-toastify";



const LibraryPage = () => {

  const [userIds, setUserIds] = useState(null);
  const [userShows, setUserShows] = useState([]);

  const {data:userStoryIds, isLoading: userStoriesLoading, refetch: refecthUserStories} = useGetLibraryAPIQuery();
  const {data:userData, isLoading, refetch: refetchUserInfo} = useGetUserProfileAPIQuery();
  
  const {data:shows, isLoading: showsLoading, refetch: refecthStories} = useGetShowsByShowIdQuery(userIds);
  
  const dispatch = useDispatch();

  useEffect(() => {
    refetchUserInfo();
  }, [refetchUserInfo])

  useEffect(() => {
    if(!showsLoading && shows){
      setUserShows(shows.shows)
    }
  }, [showsLoading,userShows, shows])

useEffect(() => {
        if (!isLoading) {
           
            if(userData){
              if(userData.profileData.isSuspended){
              dispatch(logout())
              toast.error("Your Account has been Suspended!")
              location.reload();
            }
            }       
            
        }
        
    }, [isLoading, userData, dispatch]);

  useEffect(() => {
    if(!userStoriesLoading && userStoryIds){
      const ids = userStoryIds.stories.map((sid) => sid).join(',');
      setUserIds(ids)
    }
  }, [userStoriesLoading, userIds, userStoryIds])

  useEffect(() => {
    refecthUserStories();
  }, [refecthUserStories])
  useEffect(() => {
  
    refecthStories();
  }, [refecthStories])

  return (
   
    
        <div className="container mx-auto px-6 mt-12">
          {showsLoading && <LoadingSpinner />}
          {(!showsLoading && userShows.length === 0) && (
            <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
              <div className="mt-12 container flex felx-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center mt-12">
                  <p className="text-2x1 font-semibold md:text-3x1">
                  The library does not contain any items at the moment.
                  </p>
                  <p className="mt-6 mb-12 dark:text-gray-400">
                  Discover more from our collection of popular stories.
                  </p>
                  <Link className="px-8 py-3 font-semibold rounded bg-purple-600 text-white hover:bg-purple-800" to="/home">
                   Browse Popular Stories
                  </Link>

                </div>
              </div>
            </section>
          )}
          {userShows.length > 0 && <div>
            
            <LibraryList library={userShows} />

            </div>}
            
        </div>
      
    )}
    


export default LibraryPage