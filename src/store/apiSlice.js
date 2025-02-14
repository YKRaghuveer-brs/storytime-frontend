import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl : "https://v-storytime-backend.onrender.com/",
    prepareHeaders: (headers, {getState}) => {
        const state = getState()
        // console.log(state)
        const token = state.auth.token;
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        
        return headers;
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User"],
    endpoints: (builder) => ({}),
})