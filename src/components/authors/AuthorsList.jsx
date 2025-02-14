/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const AuthorsList = ({authors}) => {
    const navigate = useNavigate()


    const authorStoriesHandler = (publisher, name, url) => {
      // console.log(name);
      
        navigate("/authorstories", {state: {publisher, name, url}})
    }
  return (
    <div className="grid grid-cols-6 gap-x-6 mt-8">
      {authors.map((author) => {
        return (
            <div
            key={author.id}
            aria-current="page"
            className="p-2 rounded hover:bg-active hover:cursor-pointer group active"
            onClick={() =>
              authorStoriesHandler(
                author.publisher,
                author.name,
                author.images[0].url
              )
            }
          >
            <div className="pt-[100%] relative mb-4">
              <img
                src={author.images[0].url}
                className="absolute inset-0 object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="flex justify-between">
              <div className="inline-block w-[140px]">
                <h6 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-semibold">
                  {author.name}
                </h6>
              </div>
              <div>
                <div className="rounded bg-black p-1 ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default AuthorsList