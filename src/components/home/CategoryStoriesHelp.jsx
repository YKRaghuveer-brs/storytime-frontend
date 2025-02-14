/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { setStoryInfo, toggleSidebar } from "../../store/user/authSlice";

const CategorySearch = ({stories}) => {

  const dispatch = useDispatch();
  const showSidebar = (s_id, s_name) => {
    dispatch(setStoryInfo({s_id: s_id, s_name: s_name}));
    dispatch(toggleSidebar());
  }

  const {storyInfo} = useSelector((state) => state.auth)
  // console.log(storyInfo)

  return (
    <div className="grid grid-cols-5 gap-x-6 px-4">
      {stories.map((story) => {
        return (
          <div title={story.description}
            className="p-2 rounded hover:bg-active group active hover:cursor-pointer"
            key={story.id}
            onClick={() => showSidebar(story.id, story.name)}
          >
            <div className="pt-[100%] relative mb-4">
              <img
                src={story.images[0].url}
                className="absolute inset-0 object-cover w-full h-full rounded"
              />
              <button className="w-10 h-10 rounded-full bg-primary absolute group-hover:flex group-focus:flex bottom-2 right-2 items-center justify-center hidden">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon
                    points="21.57 12 5.98 3 5.98 21 21.57 12"
                    fill="currentColor"
                  ></polygon>
                </svg>
              </button>
            </div>
            <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
              {story.name}
            </h6>
            <p className="line-clamp-2 text-link text-sm mt-1">
              {story.publisher}
            </p>
          </div>
        );
      })}
    </div>
  )
}

export default CategorySearch;