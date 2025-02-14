import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.spotify.com/v1",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();

    const spotifyToken = state.auth.spotifyToken;
    if (spotifyToken) {
      headers.set("Authorization", `Bearer ${spotifyToken}`);
    }
    return headers;
  },
});

export const spotifyRootApiSlice = createApi({
  reducerPath: "spotify",
  baseQuery,
  tagTypes: ["Shows"],
  endpoints: (builder) => ({}),
});