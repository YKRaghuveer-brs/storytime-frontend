import { spotifyRootApiSlice } from "./spotifyRootApiSlice";
// const SPOTIFY_ENDPOINT = "/search";

export const spotifyAPISlice = spotifyRootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularShows: builder.query({
      query: ({ queryParams }) => {
        const searchParams = new URLSearchParams({
          ...queryParams,
        });
        return {
          url: `/search?${searchParams.toString()}`,
          method: "GET",
        };
      },
    }),

    getEpisodesByShowId: builder.query({
     query: (id) => {
      return {
        url: `/shows/${id}/episodes`,
        method: "GET",
      };
     },
    }),

    getShowsByShowId: builder.query({
      query: (ids) => {
       return {
         url: `/shows?ids=${ids}`,
         method: "GET",
       };
      },
     }),
     


   
  }),
});

export const {
  useGetPopularShowsQuery,
  useGetEpisodesByShowIdQuery,
  useGetShowsByShowIdQuery
} = spotifyAPISlice;