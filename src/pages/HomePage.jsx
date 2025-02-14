import { useDispatch, useSelector } from "react-redux";
import ImageBanner from "../components/home/ImageBanner";
import PopularStories from "../components/home/PopularStories";
import ShowsOfWeek from "../components/home/ShowsOfWeek";
import TopStories from "../components/home/TopStories";
import { logout, setUserProfile } from "../store/user/authSlice";
import { useGetUserProfileAPIQuery } from "../store/user/userApiSlice";
import { useState, useEffect } from "react";
import { useGetPopularShowsQuery } from "../store/spotify/spotifyApiSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { useGetLanguagesQuery } from "../store/language/languageApiSlice";

 
const HomePage = () => {
 
  const dispatch = useDispatch();
  
  const {data, isLoading, refetch: refetchUserInfo} = useGetUserProfileAPIQuery(); // userData from database
  const { userData } = useSelector((state) => state.auth); // user data from state
  const {data: languages} = useGetLanguagesQuery(); // user languages from database

  const [userLanguages, setUserLanguages] = useState("English");
// console.log(isAdmin)
  

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
    if(languages && userData){
      const userLanguage = languages.filter((language) => userData.languages.includes(language._id)).map((item) => `"${item.name}"`).join(" ");
      
      setUserLanguages(userLanguage || '"English"') //if no languages selected then default is English
  
  
    }
  }, [userData, languages])

  // console.log(userLanguages)

  
  
  
//---- Popular Stories-----------
  const [popularStories, setPopularStories] = useState([]);
  const [loadPopularStories, setLoadPopularStories] = useState(6);

//---- Top Stories------------
  const [topStories, setTopStories] = useState([]);
  const [loadTopStories, setLoadTopStories] = useState(4);

//---- Shows Of Week-----------
  const [showsOfWeek, setShowsOfWeek] = useState([]);
  const [loadShowsOfWeek, setLoadShowsOfWeek] = useState(3);

//--------------------------------------------- POPULAR STORIES ------------------------------------------------------
  const {data: popularShowsData, isLoading: popularShowsLoading} = useGetPopularShowsQuery(
    {
      queryParams: {
        q: `"popular stories" "doraemon" "popular podcast" "kids-stories" language:${userLanguages} `,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: loadPopularStories
      },
    }
  );
  

  useEffect(() => { // Popular Stories
    try {
      if(!popularShowsLoading){
      setPopularStories(popularShowsData.shows.items);
    }
    } catch (error) {
      console.log(error)
      setPopularStories([]);
    }
    
  },[popularShowsLoading, popularShowsData])

//--------------------------------------------- TOP STORIES ------------------------------------------------------
  const {data: topShowsData, isLoading: topShowsDataLoading} = useGetPopularShowsQuery(
    {
      queryParams: {
        q: `"top stories"  "top podcast" language:${userLanguages}`,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: loadTopStories
      },
    }
  );

  useEffect(() => {  // Top Stories
    try {
      if(!topShowsDataLoading){
      setTopStories(topShowsData.shows.items);
    }
    } catch (error) {
      console.log(error)
      setTopStories([]);
    }
    
  },[topShowsDataLoading, topShowsData])



  //--------------------------------------------- SHOWS OF THE WEEK ------------------------------------------------------
  const {data: ShowsOfWeekData, isLoading: ShowsOfWeekDataLoading} = useGetPopularShowsQuery(
    {
      queryParams: {
        q: `"shows of the week" ""stories of the week" "Trending stories" language:${userLanguages}`,
        type: "show",
        include_external: "audio",
        market: "IN",
        limit: loadShowsOfWeek
      },
    }
  );

  useEffect(() => {  // shows Of The Week
    try {
      if(!ShowsOfWeekDataLoading){
      setShowsOfWeek(ShowsOfWeekData.shows.items);
    }
    } catch (error) {
      console.log(error)
      setShowsOfWeek([]);
    }
    
  },[ShowsOfWeekDataLoading, ShowsOfWeekData])
 
//-----------------------------------------------------------------------------------------------------------------------
  
  useEffect(() => {
  refetchUserInfo();
  }, [refetchUserInfo])
  

  


  return (
    <>
    {(popularShowsLoading || ShowsOfWeekDataLoading || topShowsDataLoading) && <LoadingSpinner />}
    <div className="container mx-auto p-2">
      <ImageBanner />
      <section>
      <div className="container mx-auto">
        <div>
          <header className="flex items-center justify-between mb-2 mt-6">
            <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
              Popular Stories
            </div>
            <div onClick={() => {popularStories.length !== 0 && setLoadPopularStories(48); if(loadPopularStories === 48) setLoadPopularStories(6); }}       
              className="text-xs z-10 font-semibold tracking-wider uppercase text-link hover:underline hover:cursor-pointer">
             { (loadPopularStories === 48) ? "VIEW LESS ▲" : "VIEW ALL ▼"}
            </div>
          </header>
        { (!popularShowsLoading && !popularShowsData) ? 
          <p className="text-center mx-auto text-orange-600">Popular Stories not found</p>
          :
          <PopularStories stories={popularStories} />
        }
            <div
              className="text-end text-xs mt-6 font-semibold tracking-wider uppercase">
              <button  onClick={() => {
                  toast.dismiss();
                    if(loadPopularStories === 42) setLoadPopularStories(48);
                    else if(popularStories.length !== 0 && loadPopularStories < 48) setLoadPopularStories(loadPopularStories + 18);
                    else toast.error("You’ve reached the end of Popular Stories!");
                    
                  }} 
                  className="text-end text-xs font-semibold tracking-wider uppercase text-white hover:underline hover:cursor-pointer bg-purple-500 border-2 border-purple-600 py-1 px-2 rounded">
                    { (loadPopularStories === 48 || popularStories.length === 0) ? "no more Stories" : "Load more Stories"}
              </button> 
            </div>
          </div>

          <div>
              <header className="flex items-center justify-between mb-2 mt-5">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
                  Top Stories & Podcasts
                </div>

                <div onClick={() => {topStories.length !== 0 &&  setLoadTopStories(48); if(loadTopStories === 48) setLoadTopStories(4); }}       
                  className="text-xs font-semibold tracking-wider uppercase text-link hover:underline hover:cursor-pointer">
                  {(loadTopStories === 48) ? "VIEW LESS ▲" : "VIEW ALL ▼"}
                </div>
              </header>
              { (!topShowsDataLoading && !topShowsData) ? 
              <p className="text-center mx-auto text-orange-600">Top Stories & Podcasts not found</p>
              :
              <TopStories stories={topStories} />
              }
            <div
              className="text-end text-xs font-semibold tracking-wider uppercase">
              <button  onClick={() => {
                  toast.dismiss();
                    if(loadTopStories === 40) setLoadTopStories(48);
                    else if(topStories.length !== 0 && loadTopStories < 48) setLoadTopStories(loadTopStories + 18);
                    else toast.error("You’ve reached the end of Top Stories!");
                    
                  }} 
                  className="text-end text-xs font-semibold tracking-wider uppercase text-white hover:underline hover:cursor-pointer bg-purple-500 border-2 border-purple-600 py-1 px-2 rounded">
                    { (loadTopStories === 48 || topStories.length === 0) ? "no more Stories" : "Load more Stories"}
              </button> 
            </div>
            </div>

            <div>
              <header className="flex items-center justify-between mb-2 mt-5">
                <div className="text-2xl text-white font-semibold tracking-tight hover:underline hover:cursor-pointer">
                  Shows of the week
                </div>

                <div onClick={() => {showsOfWeek.length !== 0 && setLoadShowsOfWeek(48); if(loadShowsOfWeek === 48) setLoadShowsOfWeek(3); }}       
                  className="text-xs font-semibold tracking-wider uppercase text-link hover:underline hover:cursor-pointer">
                { (loadShowsOfWeek === 48) ? "VIEW LESS ▲" : "VIEW ALL ▼"}
                </div>
              </header>
              { (!ShowsOfWeekDataLoading && !ShowsOfWeekData) ? 
              <p className="text-center mx-auto text-orange-600">Shows of the week not found</p>
              :
              <ShowsOfWeek stories={showsOfWeek} />
              }
              <div
              className="text-end text-xs font-semibold tracking-wider uppercase">
              <button  onClick={() => {
                  toast.dismiss();
                    if(showsOfWeek.length !== 0 && loadShowsOfWeek < 48) setLoadShowsOfWeek(loadShowsOfWeek + 15);
                    else toast.error("You’ve reached the end of Shows of the week!");
                    
                  }} 
                  className="text-end text-xs mb-6 font-semibold tracking-wider uppercase text-white hover:underline hover:cursor-pointer bg-purple-500 border-2 border-purple-600 py-1 px-2 rounded">
                    { (loadShowsOfWeek === 48 || showsOfWeek.length === 0) ? "no more Stories" : "Load more Stories"}
              </button> 
            </div>
            </div>
          
        </div>
      </section>
    </div>
    
    </>
    
  )
}

export default HomePage