/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { setStoryInfo, toggleSidebar } from "../store/user/authSlice";


const LibraryList = ( {library} ) => {

    const dispatch = useDispatch()

    const showSidebar = (id, name) => {
      dispatch(setStoryInfo({s_id: id, s_name: name}))
      dispatch(toggleSidebar())
    }
  

  return (
    <div className="grid grid-cols-6 gap-x-6">
      {library.slice().reverse().map((item) => {
        return (
          <div
            className="p-2 rounded hover:bg-active group active hover:cursor-pointer"
            key={item.id}
            onClick={() => showSidebar(item.id, item.name)}
          >
            <div className="pt-[100%] relative mb-4">
              <img
                src={item.images[0].url}
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
              {item.name}
            </h6>
            <p className="line-clamp-2 text-link text-sm mt-1">
              {item.publisher}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default LibraryList